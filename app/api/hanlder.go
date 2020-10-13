package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)


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

	req, err := http.NewRequest("GET", apiUrl+r.URL.Path+"?apiKey="+apiKey, nil)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	req.Header.Set("Accept-Encoding", r.Header.Get("Accept-Encoding"))
	req.Header.Set("origin", "https://koronawirus-w-polsce.pl")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	defer resp.Body.Close()
	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.Header().Set("Content-Encoding", resp.Header.Get("Content-Encoding"))
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Header().Set("Content-Type", "application/json; charset=utf-8")

	_, err = rw.Write(data)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
}