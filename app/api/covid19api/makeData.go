package covid19api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/andybalholm/brotli"
)


const apiUrl = "https://api-korona-wirus.pl"
const apiKey = "27881261-6dbc-4867-a13d-a4f8541dc193"

func makeDataFunc(key string, info interface{}) (interface{}, error) {
	path := key

	for _, validEnpoint := range validEnpoints {
		if validEnpoint == path {
			return fetchData(path)
		}
	}

	for _, computedEnpoint := range computedEnpoints {
		if computedEnpoint == path {
			return computeData(path)
		}
	}

	return nil, fmt.Errorf("Undefined enpoint: %s", path)
}

func fetchData(path string) (cachedData, error) {
	req, err := http.NewRequest("GET", apiUrl+"/"+path+"?apiKey="+apiKey, nil)
	if err != nil {
		return nilCachedData, err
	}

	req.Header.Set("origin", "https://koronawirus-w-polsce.pl")
	req.Header.Set("Accept-Encoding", "br")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nilCachedData, err
	}

	if resp.StatusCode != http.StatusOK {
		return nilCachedData, fmt.Errorf("Unexpected status code" + resp.Status)
	}

	var reader io.Reader
	if resp.Header.Get("Content-Encoding") == "br" {
		reader = brotli.NewReader(resp.Body)
	} else {
		reader = resp.Body
	}

	data, err := reciveAndSortData(reader, path)
	if err != nil {
		return nilCachedData, err
	}
	resp.Body.Close()

	return cachedData{d: data}, nil
}

const dayMonthYearCorrect = "02.01.2006"
const exactTimeCorrect = "15:04:05"

const dayMonthYear = "_2.01.2006"
const yearMonthDayTime = "2006-01-02T15:04:05.999Z"

func reciveAndSortData(body io.Reader, path string) ([]byte, error) {
	data, err := ioutil.ReadAll(body)
	if err != nil {
		return nil, err
	}

	d := make([]map[string]interface{}, 100)
	err = json.Unmarshal(data, &d)
	if err != nil {
		return nil, err
	}

	switch path {
	case "countryperday", "prognosis", "testsperday", "polandDeaths":

		// sort
		if path == "polandDeaths" {
			sort.Sort(SortByNo(d))
		} else {
			sort.Sort(sortByDate{
				data:        d,
				datePattern: dayMonthYear,
			})
		}

		// normalize dates
		for i := 0; i < len(d); i++ {
			date, ok := d[i]["date"].(string)
			if !ok {
				return nil, errors.New(`Wrong data type for d[i]["date"].(string)`)
			}

			t, err := time.Parse(dayMonthYear, date)
			if err != nil {
				return nil, err
			}

			d[i]["date"] = t.Format(dayMonthYearCorrect)
		}

	case "perday":
		// sort
		sort.Sort(sortByDate{
			data:        d,
			datePattern: yearMonthDayTime,
		})

		// normalize dates
		for i := 0; i < len(d); i++ {
			date, ok := d[i]["date"].(string)
			if !ok {
				return nil, errors.New("wrong type for data")
			}

			t, err := time.Parse(yearMonthDayTime, date)
			if err != nil {
				return nil, err
			}

			d[i]["date"] = t.Format(dayMonthYearCorrect)
		}

	case "common", "provinces":
		// normalize dates
		var key string
		var parseString string
		if path == "common" {
			key = "lastUpdate"
			parseString = yearMonthDayTime
		} else {
			key = "time_stamp"
			parseString = "2006-01-02T15:04:05.999+02:00"
		}

		for i := 0; i < len(d); i++ {
			date, ok := d[i][key].(string)
			if !ok {
				return nil, errors.New("wrong type for data")
			}

			t, err := time.Parse(parseString, date)
			if err != nil {
				return nil, err
			}

			d[i]["date"] = t.Format(dayMonthYearCorrect)
			d[i]["exactTime"] = t.Format(exactTimeCorrect)

			delete(d[i], key)
		}

		if path == "provinces" {
			for i := 0; i < len(d); i++ {
				d[i]["name"] = d[i]["_id"]
			}
		}
	}

	for i := 0; i < len(d); i++ {
		delete(d[i], "_id")
		delete(d[i], "no")
		delete(d[i], "lastUpdate")
	}

	return json.Marshal(d)
}

type sortByDate struct {
	data        []map[string]interface{}
	datePattern string
}

func (a sortByDate) Len() int      { return len(a.data) }
func (a sortByDate) Swap(i, j int) { a.data[i], a.data[j] = a.data[j], a.data[i] }
func (a sortByDate) Less(i, j int) bool {
	aI, ok := a.data[i]["date"].(string)
	if !ok {
		fmt.Println("wrong type for data")
		return false
	}

	timeI, err := time.Parse(a.datePattern, aI)
	if err != nil {
		fmt.Println(err)
	}

	aJ, ok := a.data[i]["date"].(string)
	if !ok {
		fmt.Println("wrong type for data")
		return false
	}
	timeJ, err := time.Parse(a.datePattern, aJ)
	if err != nil {
		fmt.Println(err)
	}

	return timeI.Before(timeJ)
	// return a[i] < a[j]
}

type SortByNo []map[string]interface{}

func (a SortByNo) Len() int      { return len(a) }
func (a SortByNo) Swap(i, j int) { a[i], a[j] = a[j], a[i] }
func (a SortByNo) Less(i, j int) bool {
	aI, ok := a[i]["no"].(string)
	if !ok {
		fmt.Println("wrong type for no")
		return false
	}
	aJ, ok := a[j]["no"].(string)
	if !ok {
		fmt.Println("wrong type for no")
		return false
	}

	aiI, err := strconv.Atoi(aI)
	if err != nil {
		fmt.Println(err)
	}
	aiJ, err := strconv.Atoi(aJ)
	if err != nil {
		fmt.Println(err)
	}

	return aiI < aiJ
	// return  aI < aJ
}
