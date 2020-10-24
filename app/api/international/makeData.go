package international

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/corioder/be.safe/api/utils"
)

const countriesListJSON = "data/countries.json"

func makeDataFunc(key string, info interface{}) (interface{}, error) {
	dirname, err := os.Getwd()
	if err != nil {
		return nil, err
	}

	countries, err := ioutil.ReadFile(filepath.Join(dirname, countriesListJSON))
	if err != nil {
		return nil, err
	}

	countriesMap := make(map[string]string)
	err = json.Unmarshal(countries, &countriesMap)
	if err != nil {
		return nil, err
	}

	countriesActivePerHoundredThousandMap := make(map[string]float32)
	reciveDataChan := make(chan struct {
		countryName               string
		activePerHoundredThousand float32
	})

	rootWG := sync.WaitGroup{}
	rootWG.Add(1)
	go func() {
		defer rootWG.Done()
		for data := range reciveDataChan {
			countriesActivePerHoundredThousandMap[data.countryName] = data.activePerHoundredThousand
		}
	}()

	reciverWG := sync.WaitGroup{}
	reciverWG.Add(len(countriesMap))
	for countryCode, countryName := range countriesMap {
		go func(countryCode, countryName string) {
			defer reciverWG.Done()
			activePerHoundredThousand, err := getActivePerHoundredThousand(countryCode)
			if err != nil {
				fmt.Println(err)
				return
			}
			reciveDataChan <- struct {
				countryName               string
				activePerHoundredThousand float32
			}{countryName, activePerHoundredThousand}
			fmt.Println(countryCode, "done")
		}(countryCode, countryName)
	}

	reciverWG.Wait()
	close(reciveDataChan)

	rootWG.Wait()

	bytes, err := json.Marshal(countriesActivePerHoundredThousandMap)
	if err != nil {
		return nil, err
	}

	return cachedData{d: bytes}, nil
}

type population struct {
	Population int `json:"population"`
}

type rds struct {
	Records [][]int `json:"records"`
}

const (
	// data format
	dfConfirmed = iota
	dfDeath
	dfRecovered
)

// cnt_confirmed,cnt_death,cnt_recovered
func getActivePerHoundredThousand(countryCode string) (float32, error) {
	client := &http.Client{
		Transport: &http.Transport{
			Dial: (&net.Dialer{
				Timeout:   time.Minute,
				KeepAlive: time.Minute,
			}).Dial,
			TLSHandshakeTimeout:   time.Minute,
			ResponseHeaderTimeout: time.Minute,
			ExpectContinueTimeout: time.Minute,
		},
	}

	populationAPIUrl := getPopulationAPIUrl(countryCode)
	rdsAPIUrl := getRdsAPIUrl(countryCode)

	rdsReq, err := http.NewRequest("GET", rdsAPIUrl, nil)
	if err != nil {
		return 0, err
	}

	rdsResp, err := client.Do(rdsReq)
	if err != nil {
		return 0, err
	}

	defer rdsResp.Body.Close()
	rdsRespBody, err := ioutil.ReadAll(rdsResp.Body)
	if err != nil {
		return 0, err
	}

	popReq, err := http.NewRequest("GET", populationAPIUrl, nil)
	if err != nil {
		return 0, err
	}

	popResp, err := client.Do(popReq)
	if err != nil {
		return 0, err
	}

	defer rdsResp.Body.Close()
	popRespBody, err := ioutil.ReadAll(popResp.Body)
	if err != nil {
		return 0, err
	}

	rdsJson := rds{}
	populationJson := population{}

	err = json.Unmarshal(rdsRespBody, &rdsJson)
	if err != nil {
		return 0, err
	}

	err = json.Unmarshal(popRespBody, &populationJson)
	if err != nil {
		return 0, err
	}

	record := rdsJson.Records[len(rdsJson.Records)-1]
	population := populationJson.Population
	active := record[dfConfirmed] - record[dfDeath] - record[dfRecovered]

	activePerHoundredThousand := float32(utils.RoundTo2DecimalPlaces(float64(float32(active*100000) / float32(population))))
	return activePerHoundredThousand, nil
}

func getPopulationAPIUrl(countryCode string) string {
	return "https://restcountries.eu/rest/v2/alpha/" + countryCode + "/?fields=population"
}

func getRdsAPIUrl(countryCode string) string {
	return "https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=" + countryCode + ")&limit=2500&metadata=false"
}
