package gototable

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

const url = "https://www.etravel.pl/pl/restrykcje-podrozy?fbclid=IwAR03n2NS7Jb8qvtUa5eJxQxRokjP38i0Hm2BI96XBMz1zLgxzx0VbltPtBY"

func makeDataFunc(key string, info interface{}) (interface{}, error) {
	c := colly.NewCollector()
	countries := make([]country, 0, 47)

	c.OnHTML("section.main", func(h *colly.HTMLElement) {
		// 47 because on travel site there is 47 countries
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
	})

	err := c.Visit(url)
	if err != nil {
		return nil, err
	}

	d, err := json.Marshal(countries)
	if err != nil {
		return nil, err
	}

	return cachedData{d}, nil
	// return nil, nil
}
