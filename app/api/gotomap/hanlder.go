package gotomap

import (
	"fmt"
	"net/http"
	"time"

	"github.com/corioder/be.safe/api/cache"
	"github.com/corioder/be.safe/api/utils"
)

var globalCache *cache.Cache

var nilCachedData cachedData

type cachedData struct {
	d []byte
}

func init() {
	globalCache = cache.NewCache(time.Hour/2, makeDataFunc)
}

func Handler(pattern string) (string, func(rw http.ResponseWriter, r *http.Request)) {
	return pattern, func(rw http.ResponseWriter, r *http.Request) {
		defer utils.RecoverFunc()

		path := utils.RelativeURLPath(pattern, r.URL.Path)
		if path != "" {
			fmt.Printf("Undefined enpoint: %s\n", path)
			rw.WriteHeader(http.StatusInternalServerError)
		}

		cData, err := globalCache.GetData(path, nil)

		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
		}

		data, ok := cData.(cachedData)
		if !ok {
			fmt.Println("Wrong data type for cData.(cachedData)")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		utils.AllowCors(rw)

		_, err = rw.Write(data.d)
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}
