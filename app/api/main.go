package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/corioder/be.safe/api/covid19api"
)

func main() {
	http.HandleFunc("/", covid19api.Covid19ApiHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	fmt.Println("Listening on port: " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		panic(err)
	}
}
