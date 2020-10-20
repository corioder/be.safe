package utils

import "fmt"

func RecoverFunc() {
	err := recover()
	if err != nil {
		fmt.Println("recoverd from error:", err)
	}
}
