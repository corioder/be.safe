package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/corioder/be.safe/api/covid19api"
	"github.com/corioder/be.safe/api/gototable"
	"github.com/corioder/be.safe/api/international"
)

func main() {
	http.HandleFunc(covid19api.Handler("/api/"))
	http.HandleFunc(gototable.Handler("/tab/"))
	http.HandleFunc(international.Handler("/int/"))

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
