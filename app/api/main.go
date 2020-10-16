package main

import (
	"fmt"
	"net/http"
	"os"
)


func main() {
	// TODO: mayby add cache

	// a := time.Now()

	// time.Sleep(time.Second)

	// fmt.Println(time.Since(a))
	// time.Second


	http.HandleFunc("/", apiBinds)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	fmt.Println("Listening on port: "+port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		panic(err)
	}
}
