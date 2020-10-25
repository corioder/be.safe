package utils

import "net/http"


func AllowCors(rw http.ResponseWriter) {
	rw.Header().Set("Access-Control-Allow-Origin", "*")
}