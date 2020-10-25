package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/apex/gateway"
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

	http.HandleFunc("/api", func(rw http.ResponseWriter, r *http.Request) {
		rw.Write([]byte("Hello"))
	})

	err := listenAndServe(portStr, nil)
	if err != nil {
		panic(err)
	}

	// http.HandleFunc(covid19api.Handler("/api/"))
	// http.HandleFunc(gototable.Handler("/tab/"))
	// http.HandleFunc(international.Handler("/int/"))

	// port := os.Getenv("PORT")
	// if port == "" {
	// 	port = "8081"
	// }

	// fmt.Println("List-ening on port: " + port)
	// err := http.ListenAndServe(":"+port, nil)
	// if err != nil {
	// 	panic(err)
	// }
}
