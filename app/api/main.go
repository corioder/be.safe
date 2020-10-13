package main

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

const apiUrl = "https://api-korona-wirus.pl"

func main() {
	r := gin.Default()

	r.GET("/:enpoint", func(c *gin.Context) {
		s := c.Param("enpoint")

		if s == "" {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		req, err := http.NewRequest("GET", apiUrl+"/"+s+"?apiKey=27881261-6dbc-4867-a13d-a4f8541dc193", nil)
		if err != nil {
			panic(err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		req.Header.Set("origin", "koronawirus-w-polsce.pl")

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		fmt.Println("%+v", resp)

		if resp.StatusCode != http.StatusOK {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		defer resp.Body.Close()
		data, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			panic(err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		fmt.Println(string(data))
		c.Writer.Write([]byte(data))
		c.Status(http.StatusOK)
	})

	r.Run(":8080")
	fmt.Println("aaa")
}
