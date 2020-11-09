package covid19api

import (
	"encoding/json"

	"fmt"

	"github.com/corioder/be.safe/api/utils"
)

func computeData(path string) (cachedData, error) {
	switch path {
	case "categories":
		return getCategories()

	}

	return cachedData{}, nil
}

var categoriesPerDayDataEntries = [...]string{"confirmed", "active_cases", "deaths", "recovered", "quarantine", "supervision", "tests", "people_tested", "negative_tests", "hospitalized", "respirators", "activePerHoundredThousand"}

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

	perdayDataCorrect := make([]map[string]float64, 8)
	// perdayDataCorrect := make([]map[string]float64, 2)
	j := 0
	// extracting 7 elements so we can calculate perday and week data
	for i := len(perdayData) - len(perdayDataCorrect); i < len(perdayData); i++ {
		perdayDataCorrect[j] = make(map[string]float64)
		for key, elem := range perdayData[i] {
			if key == "date" {
				continue
			}

			f, err := utils.ConvertToFloat64(elem)
			if err != nil {
				return nilCachedData, err
			}

			perdayDataCorrect[j][key] = f
		}
		j++
	}

	for i := 0; i < len(perdayDataCorrect); i++ {
		active := perdayDataCorrect[i]["confirmed"] - perdayDataCorrect[i]["recovered"] - perdayDataCorrect[i]["deaths"]
		perdayDataCorrect[i]["active_cases"] = active
		perdayDataCorrect[i]["activePerHoundredThousand"] = activePerHoundredThousand(active)
	}

	// =========================================================================
	// today and yesterday

	// today     = index 1
	// yesterday = index 0

	today := len(perdayDataCorrect) - 1
	yesterday := len(perdayDataCorrect) - 2

	categoriesData := make([]map[string]float32, 0, len(categoriesPerDayDataEntries))
	for _, key := range categoriesPerDayDataEntries {
		propsMap := map[string]float32{
			"amountOfNew":   float32(utils.RoundTo2DecimalPlaces(perdayDataCorrect[today][key] - perdayDataCorrect[yesterday][key])),
			"percentChange": float32(utils.RoundTo2DecimalPlaces(float64(100 - (float32((perdayDataCorrect[yesterday][key] * 100)) / float32(perdayDataCorrect[today][key]))))),
		}

		if key == "activePerHoundredThousand" {
			propsMap["amount"] = float32(perdayDataCorrect[today]["activePerHoundredThousand"])
		}

		categoriesData = append(categoriesData, propsMap)
	}

	// =========================================================================
	// week data

	var oldMeanForWeek float64
	for i := 0; i < len(perdayDataCorrect)-1; i++ {
		oldMeanForWeek += perdayDataCorrect[i]["active"]
	}
	oldMeanForWeek /= float64(len(perdayDataCorrect))

	var meanForWeek float64
	for i := 1; i < len(perdayDataCorrect); i++ {
		meanForWeek += perdayDataCorrect[i]["active"]
	}
	meanForWeek /= float64(len(perdayDataCorrect))

	meanForWeekMap := map[string]float32{
		"amoun":         float32(meanForWeek),
		"amountOfNew":   float32(utils.RoundTo2DecimalPlaces(meanForWeek - oldMeanForWeek)),
		"percentChange": float32(utils.RoundTo2DecimalPlaces(float64(100 - (float32((oldMeanForWeek * 100)) / float32(meanForWeek))))),
	}

	meanForWeekPerHoundredThousand := activePerHoundredThousand(meanForWeek)
	oldMeanForWeekPerHoundredThousand := activePerHoundredThousand(oldMeanForWeek)

	meanForWeekPerHoundredMap := map[string]float32{
		"amoun":         float32(meanForWeekPerHoundredThousand),
		"amountOfNew":   float32(utils.RoundTo2DecimalPlaces(meanForWeekPerHoundredThousand - oldMeanForWeekPerHoundredThousand)),
		"percentChange": float32(utils.RoundTo2DecimalPlaces(float64(100 - (float32((oldMeanForWeekPerHoundredThousand * 100)) / float32(meanForWeekPerHoundredThousand))))),
	}

	categoriesData = append(categoriesData, meanForWeekMap, meanForWeekPerHoundredMap)

	d, err := json.Marshal(categoriesData)
	if err != nil {
		return nilCachedData, err
	}

	return cachedData{d: d}, nil
}
