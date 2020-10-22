package covid19api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/corioder/be.safe/api/cache"
	"github.com/corioder/be.safe/api/utils"
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

func Handler(pattern string) (string, func(rw http.ResponseWriter, r *http.Request)) {
	return pattern, func(rw http.ResponseWriter, r *http.Request) {
		defer utils.RecoverFunc()

		cData, err := globalCache.GetData(utils.RelativeURLPath(pattern, r.URL.Path), nil)
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

		utils.AllowCors(rw)

		_, err = rw.Write(data.d)
		if err != nil {
			fmt.Println(err)
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}

func activePerHoundredThousand(active float64) float64 {
	const peopleInPolland = 37970000
	return (100000 * active) / peopleInPolland
}
