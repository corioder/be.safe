package main

import (
	"fmt"
	"net/http"
	"os"
)


func main() {
	// TODO: mayby add cache

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
