package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"sort"
	"strconv"
	"sync"
	"time"

	"github.com/andybalholm/brotli"
)

var validEnpoints = [...]string{"countryperday", "common", "perday", "polandDeaths", "prognosis", "provinces", "testsperday"}

// TODO: create responde for computed
var computedEnpoints = [...]string{"activeperday"}

type cache struct {
	mu   sync.RWMutex
	data map[string]cacheData
}

type cacheData struct {
	data      []byte
	headers   http.Header
	addedTime time.Time
}

func newCache() *cache {
	return &cache{
		mu:   sync.RWMutex{},
		data: make(map[string]cacheData),
	}
}

func (c *cache) GetData(r *http.Request) ([]byte, http.Header, error) {
	path := r.URL.Path[1:]

	for _, validEnpoint := range validEnpoints {
		if path == validEnpoint {
			return c.getCachedIfPossible(r, path)
		}
	}

	return make([]byte, 0), nil, nil
}

func (c *cache) getCachedIfPossible(r *http.Request, path string) ([]byte, http.Header, error) {
	c.mu.RLock()
	data, ok := c.data[path]
	c.mu.RUnlock()
	if !ok {
		data, headers, err := c.fetchData(r, path)
		if err != nil {
			return nil, nil, err
		}

		c.mu.Lock()
		c.data[path] = cacheData{
			data:      data,
			headers:   headers,
			addedTime: time.Now(),
		}
		c.mu.Unlock()

		return data, headers, nil
	}

	if time.Since(data.addedTime) > time.Hour/2 {
		// data expired
		data, headers, err := c.fetchData(r, path)
		if err != nil {
			return nil, nil, err
		}

		c.mu.Lock()
		c.data[path] = cacheData{
			data:      data,
			headers:   headers,
			addedTime: time.Now(),
		}
		c.mu.Unlock()

		return c.fetchData(r, path)
	}

	return data.data, data.headers, nil
}

const apiUrl = "https://api-korona-wirus.pl"
const apiKey = "27881261-6dbc-4867-a13d-a4f8541dc193"

func (c *cache) fetchData(r *http.Request, path string) ([]byte, http.Header, error) {
	req, err := http.NewRequest("GET", apiUrl+r.URL.Path+"?apiKey="+apiKey, nil)
	if err != nil {
		return nil, nil, err
	}

	req.Header.Set("origin", "https://koronawirus-w-polsce.pl")
	req.Header.Set("Accept-Encoding", "br")
	// for key, value := range r.Header {
	// 	req.Header[key] = value
	// }

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, nil, fmt.Errorf("Unexpected status code" + resp.Status)
	}

	var reader io.Reader

	if resp.Header.Get("Content-Encoding") == "br" {
		reader = brotli.NewReader(resp.Body)
	} else {
		reader = resp.Body
	}

	data, err := c.reciveAndSortData(reader, path)
	if err != nil {
		return nil, nil, err
	}
	resp.Body.Close()

	responseWriterHeaders := make(http.Header)
	// TODO: compression
	// useBr := false
	// if strings.Contains(r.Header.Get("Accept-Encoding"), "br") {
	// useBr = true
	// responseWriterHeaders.Set("Content-Encoding", "br")
	// }

	// if useBr {
	// 	pr, pw := io.Pipe()
	// 	brotli.NewWriter(pw)
	// 	data, err = ioutil.ReadAll(pr)
	// 	if err != nil {
	// 		return nil, nil, err
	// 	}
	// }

	return data, responseWriterHeaders, nil
}

const dayMonthYearCorrect = "02.01.2006"
const exactTimeCorrect = "15:04:05"

const dayMonthYear = "_2.01.2006"

// 2020-10-16T12:30:09+02:00
const yearMonthDayTime = "2006-01-02T15:04:05.999Z"

func (c *cache) reciveAndSortData(body io.Reader, path string) ([]byte, error) {
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
				return nil, errors.New("wrong type for data")
			}

			t, err := time.Parse(dayMonthYear, date)
			if err != nil {
				return nil, err
			}

			d[i]["date"] = t.Format(dayMonthYearCorrect)
		}

	case "common", "perday", "provinces":

		// sort
		if path == "perday" {
			sort.Sort(sortByDate{
				data:        d,
				datePattern: yearMonthDayTime,
			})
		}

		// normalize dates
		if path == "perday" {
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
			break
		}

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
