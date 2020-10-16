package covid19api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/corioder/be.safe/api/cache"
)

var computedEnpoints = [...]string{"categories"}
var validEnpoints = [...]string{"countryperday", "common", "perday", "polandDeaths", "prognosis", "provinces", "testsperday"}
var globalCache *cache.Cache

func init() {
	globalCache = cache.NewCache(time.Hour/2, makeDataFunc)
}

var nilCachedData cachedData

type cachedData struct {
	d []byte
}

func Covid19ApiHandler(rw http.ResponseWriter, r *http.Request) {
	defer func() {
		err := recover()
		if err != nil {
			fmt.Println("recoverd from error:", err)
		}
	}()

	if r.URL.Path == "/inform" || r.URL.Path == "/favicon.ico" {
		rw.WriteHeader(http.StatusNotFound)
		return
	}

	cData, err := globalCache.GetData(r.URL.Path[1:], nil)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	data, ok := cData.(cachedData)
	if !ok {
		fmt.Println("Wrong data type for cData.(cachedData)")
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.Header().Set("Access-Control-Allow-Origin", "*")

	_, err = rw.Write(data.d)
	if err != nil {
		fmt.Println(err)
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
}
