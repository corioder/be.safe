package main

import (
	"fmt"
	"net/http"
)

const url = "https://api-korona-wirus.pl/provinces?apiKey=27881261-6dbc-4867-a13d-a4f8541dc193"

func main() {

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		panic(err)
	}
	req.Header.Set("origin", "https://koronawirus-w-polsce.pl")
	for a, b := range req.Header {
		fmt.Println(a, b)

	}

	// resp, err := http.DefaultClient.Do(req)
	// if err != nil {
	// 	panic(err)
	// }

	// data, err := ioutil.ReadAll(resp.Body)
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println(string(data))

	// fmt.Println(req.Response.Status)

}
