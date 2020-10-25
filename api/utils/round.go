package utils

import "math"

func RoundTo2DecimalPlaces(n float64) float64 {
	return math.Round(n*100) / 100
}

