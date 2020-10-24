package gotomap

import (
	"encoding/json"

	"github.com/gocolly/colly"
)

type country struct {
	Landborder  string `json:"landborder"`
	Airborder   string `json:"airborder"`
	Requirement string `json:"requirement"`
	Name        string `json:"name"`
}

func makeDataFunc(key string, info interface{}) (interface{}, error) {
	c := colly.NewCollector()
	dataMap := make(map[string]interface{})

	c.OnHTML("section.main", func(h *colly.HTMLElement) {
		h.ForEachWithBreak("div > p", func(i int, h *colly.HTMLElement) bool {
			dataMap["header"] = h.Text
			return false
		})

		// 47 because on travel site there is 47 countries
		countries := make([]country, 0, 47)
		h.ForEach("tbody > tr", func(i int, h *colly.HTMLElement) {
			if i == 0 {
				return
			}

			c := country{}
			h.ForEach("td", func(i int, h *colly.HTMLElement) {
				switch i {
				case 0:
					c.Name = h.Text
				case 1:
					c.Landborder = h.Text
				case 2:
					c.Airborder = h.Text
				case 3:
					c.Requirement = h.Text
				}
			})
			countries = append(countries, c)
		})

		dataMap["countries"] = countries
	})

	err := c.Visit("https://www.etravel.pl/pl/restrykcje-podrozy?fbclid=IwAR03n2NS7Jb8qvtUa5eJxQxRokjP38i0Hm2BI96XBMz1zLgxzx0VbltPtBY")
	if err != nil {
		return nil, err
	}

	d, err := json.Marshal(dataMap)
	if err != nil {
		return nil, err
	}

	return cachedData{d}, nil
	// return nil, nil
}
