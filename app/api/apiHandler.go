package main

import (
	"fmt"
	"net/http"
)

var globalCache *cache

func init() {
	globalCache = newCache()
}

func apiBinds(rw http.ResponseWriter, r *http.Request) {
	defer func() {
		err := recover()
		if err != nil {
			fmt.Println("recoverd from error: ", err)
		}
	}()

	if r.URL.Path == "/inform" || r.URL.Path == "/favicon.ico" {
		rw.WriteHeader(http.StatusNotFound)
		return
	}

	data, headers, err := globalCache.GetData(r)

	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
	}

	for key, val := range headers {
		for _, elem := range val {
			rw.Header().Add(key, elem)
		}
	}
	rw.Header().Set("Access-Control-Allow-Origin", "*")

	_, err = rw.Write(data)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
}
