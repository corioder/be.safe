package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/apex/gateway"
	"github.com/corioder/be.safe/api/covid19api"
	"github.com/corioder/be.safe/api/gototable"
	"github.com/corioder/be.safe/api/international"
)

func main() {
	port := flag.Int("port", -1, "specify a port to use http rather than AWS Lambda")
	flag.Parse()

	listenAndServe := gateway.ListenAndServe
	portStr := ""
	if *port != -1 {
		portStr = fmt.Sprintf(":%d", *port)
		listenAndServe = http.ListenAndServe
	}

	http.HandleFunc(covid19api.Handler("/api/"))
	http.HandleFunc(gototable.Handler("/tab/"))
	http.HandleFunc(international.Handler("/int/"))

	err := listenAndServe(portStr, nil)
	if err != nil {
		panic(err)
	}
}
