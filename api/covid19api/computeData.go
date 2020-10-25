package covid19api

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"

	"github.com/corioder/be.safe/api/utils"
)

func computeData(path string) (cachedData, error) {
	switch path {
	case "categories":
		return getCategories()

	}

	return cachedData{}, nil
}

var getCategoriesDataEntries = [...]string{"confirmed", "active_cases", "deaths", "recovered", "quarantine", "supervision", "tests", "people_tested", "negative_tests", "hospitalized", "respirators", "activePerHoundredThousand"}

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

	perdayDataCorrect := make([]map[string]float64, 2)
	j := 0
	for i := len(perdayData) - 2; i < len(perdayData); i++ {
		perdayDataCorrect[j] = make(map[string]float64)
		for key, elem := range perdayData[i] {
			if key == "date" {
				continue
			}

			elemI, ok := elem.(int)
			if ok {
				perdayDataCorrect[j][key] = float64(elemI)
				continue
			}

			elemF, ok := elem.(float64)
			if ok {
				perdayDataCorrect[j][key] = float64(elemF)
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

			perdayDataCorrect[j][key] = float64(elemToi)
		}
		j++
	}

	for i := 0; i < len(perdayDataCorrect); i++ {
		active := perdayDataCorrect[i]["confirmed"] - perdayDataCorrect[i]["recovered"] - perdayDataCorrect[i]["deaths"]
		perdayDataCorrect[i]["active_cases"] = active
		perdayDataCorrect[i]["activePerHoundredThousand"] = activePerHoundredThousand(active)
	}

	// today     = index 1
	// yesterday = index 0

	categoriesData := make([]map[string]float32, 0, len(getCategoriesDataEntries))
	for _, key := range getCategoriesDataEntries {
		propsMap := map[string]float32{
			"amountOfNew":   float32(utils.RoundTo2DecimalPlaces(perdayDataCorrect[1][key] - perdayDataCorrect[0][key])),
			"percentChange": float32(utils.RoundTo2DecimalPlaces(float64(100 - (float32((perdayDataCorrect[0][key] * 100)) / float32(perdayDataCorrect[1][key]))))),
		}

		if key == "activePerHoundredThousand" {
			propsMap["amount"] = float32(perdayDataCorrect[1]["activePerHoundredThousand"])
		}

		categoriesData = append(categoriesData, propsMap)
	}

	d, err := json.Marshal(categoriesData)
	if err != nil {
		return nilCachedData, err
	}

	return cachedData{d: d}, nil
}
