package utils

import "strconv"

// ConvertToFloat64 converts to type float64 with default value of 0
func ConvertToFloat64(n interface{}) (float64, error) {
	if n == nil {
		return 0, nil
	}

	switch v := n.(type) {
	case float64:
		return v, nil

	case int:
		return float64(v), nil

	case string:
		return strconv.ParseFloat(v, 64)
	}

	if nFloat, ok := n.(float64); ok {
		return nFloat, nil
	}

	return 0, nil
}
