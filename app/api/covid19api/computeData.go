package covid19api

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
)

// {
// 	name: '',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: '',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: ',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: '',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: ',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: '',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: '',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: '',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: 'Liczba ',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: '',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },
// {
// 	name: '',
// 	amount: undefined,
// 	amountOfNew: undefined,
// 	percentChange: undefined,
// },

func computeData(path string) (cachedData, error) {
	switch path {
	case "categories":
		return getCategories()

	}

	return cachedData{}, nil
}

// 	amount: undefined
// 	amountOfNew: undefined
// 	percentChange: undefined

// Potwierdzone przypadki
// Aktywne przypadki
// Zgony
// Liczba wyzdrowiałych
// Kwarantanna
// Nadzór epidemologiczny
// Liczba testów
// Przetestowane osoby
// testów negatywnych
// Liczba hospitalizowanych
// Zajęte respiratory

// !pierwsze najstarsze

var getCategoriesDataEntries = [...]string{"confirmed", "active_cases", "deaths", "recovered", "quarantine", "supervision", "tests", "people_tested", "negative_tests", "hospitalized", "respirators"}

func getCategories() (cachedData, error) {
	cData, err := globalCache.GetData("perday", nil)
	if err != nil {
		return nilCachedData, err
	}

	data, ok := cData.(cachedData)
	if !ok {
		return nilCachedData, fmt.Errorf("Wrong data type for cData.(cachedData)")
	}

	perdayData := make([]map[string]interface{}, 100)
	err = json.Unmarshal(data.d, &perdayData)
	if err != nil {
		return nilCachedData, err
	}

	perdayDataCorrect := make([]map[string]int, 2)
	j := 0
	for i := len(perdayData) - 2; i < len(perdayData); i++ {
		perdayDataCorrect[j] = make(map[string]int)
		for key, elem := range perdayData[i] {
			if key == "date" {
				continue
			}

			elemI, ok := elem.(int)
			if ok {
				perdayDataCorrect[j][key] = elemI
				continue
			}

			elemF, ok := elem.(float64)
			if ok {
				perdayDataCorrect[j][key] = int(elemF)
				continue
			}

			elemS, ok := elem.(string)
			if !ok {
				fmt.Println(reflect.TypeOf(elem).String())
				return nilCachedData, fmt.Errorf("Wrong data type for elem.(string)")
			}

			elemToi, err := strconv.Atoi(elemS)
			if err != nil {
				return nilCachedData, err
			}

			perdayDataCorrect[j][key] = elemToi
		}
		j++
	}

	for i := 0; i < len(perdayDataCorrect); i++ {
		perdayDataCorrect[i]["active_cases"] = perdayDataCorrect[i]["confirmed"] - perdayDataCorrect[i]["recovered"] - perdayDataCorrect[i]["deaths"]
	}

	// today     = 1
	// yesterday = 0

	categoriesData := make([]map[string]float32, 0, len(getCategoriesDataEntries))
	for _, key := range getCategoriesDataEntries {
		categoriesData = append(categoriesData, map[string]float32{
			"amountOfNew":   float32(perdayDataCorrect[1][key] - perdayDataCorrect[0][key]),
			"percentChange": float32((perdayDataCorrect[0][key] * 100)) / float32(perdayDataCorrect[1][key]),
		})
	}

	d, err := json.Marshal(categoriesData)
	if err != nil {
		return nilCachedData, err
	}

	return cachedData{d: d}, nil
}
