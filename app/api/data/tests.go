package data

import (
	"encoding/json"
	"strconv"
	"strings"

	"github.com/gocolly/colly"
)

type testsData struct {
	Date                   date             `json:"date"`
	NumberOfTestInProvince map[string]int64 `json:"mumberOfTest"`
	AllTests               int64            `json:"allTests"`
}

// GetNuberOfTests returns number of tests in json format
func GetNuberOfTests() ([]byte, error) {
	td := testsData{
		Date:                   date{},
		NumberOfTestInProvince: make(map[string]int64),
		AllTests:               0,
	}

	c := colly.NewCollector()

	c.OnHTML("#main-content>p.intro", func(h *colly.HTMLElement) {
		// Stan na 12 października 2020 r.
		temp := strings.Split(h.Text, " ")

		td.Date.Day = temp[2]
		td.Date.Month = temp[3]
		td.Date.Year = temp[4]
	})

	var globalErr error

	c.OnHTML("tbody", func(h *colly.HTMLElement) {
		h.ForEachWithBreak("tr", func(i int, h *colly.HTMLElement) bool {
			if i == 16 {
				temp, err := strconv.Atoi(strings.ReplaceAll(strings.Split(h.Text, "\n")[2], " ", ""))

				if err != nil {
					globalErr = err
					return false
				}

				td.AllTests = int64(temp)
				return true
			}

			var provinceName string
			h.ForEachWithBreak("td", func(i int, h *colly.HTMLElement) bool {
				if i == 0 {
					provinceName = h.Text
				} else {
					temp, err := strconv.Atoi(strings.ReplaceAll(h.Text, " ", ""))
					if err != nil {
						globalErr = err
						return false
					}

					td.NumberOfTestInProvince[provinceName] = int64(temp)
				}
				return true
			})

			return true
		})
	})

	err := c.Visit("https://www.gov.pl/web/zdrowie/liczba-wykonanych-testow")
	if err != nil {
		return nil, err
	}

	if globalErr != nil {
		return nil, globalErr
	}

	data, err := json.Marshal(td)
	if err != nil {
		return nil, err
	}

	return data, nil
}
