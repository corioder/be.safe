package twitterapi

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/corioder/be.safe/api/utils"
)

// curl -X GET \
// -H "Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAKnSIwEAAAAAeijVcknW0cr9x4W2OftfgkaBug0%3DwwaDBgR2pSRS4sCrgFnSaaHdp0TlQlO6f5WPRFriaIW3NfBZho" \
// "https://api.twitter.com/2/tweets/search/recent?query=from:MZ_GOV_PL&max_results=10"

// https://api.twitter.com/2/tweets/search/recent?query=from:MZ_GOV_PL&max_results=10
const apiKey = "Bearer AAAAAAAAAAAAAAAAAAAAAKnSIwEAAAAAeijVcknW0cr9x4W2OftfgkaBug0%3DwwaDBgR2pSRS4sCrgFnSaaHdp0TlQlO6f5WPRFriaIW3NfBZho"
const rawApiUrl = "api.twitter.com"
const apiUrl = "https://" + rawApiUrl

func Handler(pattern string) (string, func(rw http.ResponseWriter, r *http.Request)) {

	target, err := url.Parse(apiUrl)
	if err != nil {
		fmt.Println(err)
		return "", nil
	}

	reverseProxy := httputil.NewSingleHostReverseProxy(target)
	oldDirector := reverseProxy.Director
	reverseProxy.Director = func(h *http.Request) {
		h.Header.Set("Authorization", apiKey)
		oldDirector(h)
		h.Host = rawApiUrl
	}

	return pattern, func(rw http.ResponseWriter, r *http.Request) {
		defer utils.RecoverFunc()
		utils.AllowCors(rw)

		r.URL, err = url.ParseRequestURI("/" + utils.RelativeURLPath(pattern, r.RequestURI))
		reverseProxy.ServeHTTP(rw, r)
	}
}
