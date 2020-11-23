package covid19api

import (
	"encoding/json"
	"fmt"

	"github.com/corioder/be.safe/api/utils"
)

var categoriesPerDayDataEntries = [...]string{"confirmed", "active", "deaths", "recovered", "quarantine", "supervision", "tests", "people_tested", "negative_tests", "hospitalized", "respirators", "activePerHoundredThousand"}

func getCategories() (cachedData, error) {
	cData, err := globalCache.GetData("perday", nil)
	if err != nil {
		return nilCachedData, err
	}

	data, ok := cData.(cachedData)
	if !ok {
		return nilCachedData, fmt.Errorf("Wrong data type for cData.(cachedData)")
	}

	perdayDataInterface := make([]map[string]interface{}, 100)
	err = json.Unmarshal(data.d, &perdayDataInterface)
	if err != nil {
		return nilCachedData, err
	}
	perdayDataInterface = perdayDataInterface[len(perdayDataInterface)-9:]

	perdayData := make([]map[string]float64, len(perdayDataInterface))
	for i := 0; i < len(perdayData); i++ {
		perdayData[i] = make(map[string]float64)
		for key, elem := range perdayDataInterface[i] {
			if key == "date" {
				continue
			}

			f, err := utils.ConvertToFloat64(elem)
			if err != nil {
				return nilCachedData, err
			}

			perdayData[i][key] = f
		}
	}

	for i := 0; i < len(perdayData); i++ {
		active := perdayData[i]["confirmed"] - perdayData[i]["recovered"] - perdayData[i]["deaths"]
		perdayData[i]["activePerHoundredThousand"] = activePerHoundredThousand(active)
	}

	categoriesData := make([]map[string]float32, 0, len(categoriesPerDayDataEntries))
	// =========================================================================
	// today and yesterday

	// today     = index 1
	// yesterday = index 0

	today := perdayData[len(perdayData)-1]
	yesterday := perdayData[len(perdayData)-2]

	for _, key := range categoriesPerDayDataEntries {
		propsMap := map[string]float32{
			"amountOfNew":   float32(utils.RoundTo2DecimalPlaces(today[key] - yesterday[key])),
			"percentChange": float32(utils.RoundTo2DecimalPlaces(float64((float32((today[key] * 100)) / float32(yesterday[key])) - 100))),
		}

		if key == "activePerHoundredThousand" {
			propsMap["amount"] = float32(utils.RoundTo2DecimalPlaces(today["activePerHoundredThousand"]))
		}

		categoriesData = append(categoriesData, propsMap)
	}

	// =========================================================================
	// week data
	const daysInWeek = 7

	var meanForWeek float64
	for i := 1; i < len(perdayData)-1; i++ {
		meanForWeek += (perdayData[i+1]["confirmed"] - perdayData[i]["confirmed"])
	}
	meanForWeek /= daysInWeek

	var oldMeanForWeek float64
	for i := 0; i < len(perdayData)-2; i++ {
		oldMeanForWeek += (perdayData[i+1]["confirmed"] - perdayData[i]["confirmed"])
	}
	oldMeanForWeek /= daysInWeek

	meanForWeekMap := map[string]float32{
		"amount":        float32(utils.RoundTo2DecimalPlaces(meanForWeek)),
		"amountOfNew":   float32(utils.RoundTo2DecimalPlaces(meanForWeek - oldMeanForWeek)),
		"percentChange": float32(utils.RoundTo2DecimalPlaces(float64((float32((meanForWeek * 100)) / float32(oldMeanForWeek)) - 100))),
	}

	meanForWeekPerHoundredThousand := activePerHoundredThousand(meanForWeek)
	oldMeanForWeekPerHoundredThousand := activePerHoundredThousand(oldMeanForWeek)

	meanForWeekPerHoundredMap := map[string]float32{
		"amount":        float32(utils.RoundTo2DecimalPlaces(meanForWeekPerHoundredThousand)),
		"amountOfNew":   float32(utils.RoundTo2DecimalPlaces(meanForWeekPerHoundredThousand - oldMeanForWeekPerHoundredThousand)),
		"percentChange": float32(utils.RoundTo2DecimalPlaces(float64((float32((meanForWeekPerHoundredThousand * 100)) / float32(oldMeanForWeekPerHoundredThousand)) - 100))),
	}

	categoriesData = append(categoriesData, meanForWeekMap, meanForWeekPerHoundredMap)

	// =========================================================================
	// tests per confirmed
	testsPerConfirmedRatio := (today["confirmed"] - yesterday["confirmed"]) / (today["tests"] - yesterday["tests"])
	oldTestsPerConfirmedRatio := (perdayData[len(perdayData)-2]["confirmed"] - perdayData[len(perdayData)-3]["confirmed"]) / (perdayData[len(perdayData)-2]["tests"] - perdayData[len(perdayData)-3]["tests"])

	testsPerConfirmedMap := map[string]float32{
		"amount":        float32(utils.RoundTo2DecimalPlaces(testsPerConfirmedRatio)),
		"amountOfNew":   float32(utils.RoundTo2DecimalPlaces(testsPerConfirmedRatio - oldTestsPerConfirmedRatio)),
		"percentChange": float32(utils.RoundTo2DecimalPlaces(float64((float32((testsPerConfirmedRatio * 100)) / float32(oldTestsPerConfirmedRatio)) - 100))),
	}

	categoriesData = append(categoriesData, testsPerConfirmedMap)

	d, err := json.Marshal(categoriesData)
	if err != nil {
		return nilCachedData, err
	}

	return cachedData{d: d}, nil
}
