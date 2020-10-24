package international

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"sync"
	"time"
)

const countriesListJSON = "data/countries.json"

type countryData struct {
	CountryName               string  `json:"name"`
	ActivePerHoundredThousand float32 `json:"apht"`
}

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

	// 205 because countries.json contain 205 countries
	countriesActivePerHoundredThousand := make([]countryData, 0, 205)
	reciveDataChan := make(chan countryData)

	rootWG := sync.WaitGroup{}
	rootWG.Add(1)
	go func() {
		defer rootWG.Done()
		for data := range reciveDataChan {
			countriesActivePerHoundredThousand = append(countriesActivePerHoundredThousand, data)
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
			reciveDataChan <- countryData{countryName, activePerHoundredThousand}
			fmt.Println(countryCode, "done")
		}(countryCode, countryName)
	}

	reciverWG.Wait()
	close(reciveDataChan)
	rootWG.Wait()

	sort.Sort(SortByCountyData(countriesActivePerHoundredThousand))
	bytes, err := json.Marshal(countriesActivePerHoundredThousand)
	if err != nil {
		return nil, err
	}

	return cachedData{d: bytes}, nil
}

type SortByCountyData []countryData

func (a SortByCountyData) Len() int      { return len(a) }
func (a SortByCountyData) Swap(i, j int) { a[i], a[j] = a[j], a[i] }
func (a SortByCountyData) Less(i, j int) bool {
	return a[i].ActivePerHoundredThousand > a[j].ActivePerHoundredThousand
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

	activePerHoundredThousand := float32(active*100000) / float32(population)
	activePerHoundredThousand = float32(math.Round(float64(activePerHoundredThousand*10000)) / 10000)

	return activePerHoundredThousand, nil
}

func getPopulationAPIUrl(countryCode string) string {
	return "https://restcountries.eu/rest/v2/alpha/" + countryCode + "/?fields=population"
}

func getRdsAPIUrl(countryCode string) string {
	return "https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=" + countryCode + ")&limit=2500&metadata=false"
}
