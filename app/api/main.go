package main

import (
	"net/http"
)

//!sortowanie : pierwsze najstarsze

// UWAGA WIĘKSZOŚĆ JEST NIE PO KOLEI

// perday - historia codzienna w polsce:
// 	{
// 	"_id": "13.10.2020",
// 	"confirmed": "135278",
// 	"date": "2020-10-12T22:00:00.000Z",
// 	"deaths": "3101",
// 	"hospitalized": "5669",
// 	"negative_tests": "3591681",
// 	"positive_tests": "135278",
// 	"quarantine": "212446",
// 	"recovered": "82004",
// 	"supervision": "33533",
// 	"tests": "3726959",
// 	"respirators": 421,
// 	"people_tested": 3577867
// 	}
// ]


// common - to co jest w tej chwili:
// [
//	 {
//	 "_id": "common",
//	 "lastUpdate": "2020-10-13T17:20:02.018Z",
//	 "totalConfirmed": 37795152,
//	 "totalDeaths": 1080606,
//	 "totalRecovered": 26270220
//	 }
// ]


// provinces - potwierdzenia oraz śmierci w województwach:
// [
// 	{
// 	"_id": "Dolnośląskie",
// 	"confirmed": 7373,
// 	"deaths": 199,
// 	"time_stamp": "2020-10-13T19:40:08+02:00"
// 	},
// 	{
// 	"_id": "Mazowieckie",
// 	"confirmed": 18237,
// 	"deaths": 496,
// 	"time_stamp": "2020-10-13T19:40:08+02:00"
// 	},


// countryperday - historia codzienna na świecie:
// [
// 	{
// 	"_id": "5f71b1df6cd9144c48d1b8b4",
// 	"date": "21.06.2020",
// 	"day": "100",
// 	"italy": "233997",
// 	"germany": "186516",
// 	"usa": "2028208",
// 	"france": "154188",
// 	"spain": "289046",
// 	"uk": "269318",
// 	"south_korea": "11441",
// 	"czech": "10406",
// 	"poland": "31931"
// 	},


// prognosis - prognozy w zachorowaniach:
// 	{
// 	"_id": "5f843eb1bb0b923ea44e3df5",
// 	"date": "22.10.2020",
// 	"reported": "",
// 	"prognosis": "191248.4"
// 	}
// ]

/*
 // polandDeaths - śmierci w polsce, bardzo dokładnie:
// 	{
// 	"_id": "5f8032879f203d4e7c3bd770",
// 	"no": "2922",
// 	"age": "65",
// 	"sex": "M",
// 	"date": "9.10.2020",
// 	"province": "Pomorskie"
// 	}
// ] 
*/


/* 
// testsperday - testy dziennie w krajach, już trochę outdeted:
// 	{
// 	"_id": "5ed0daccb74a53199c057dd0",
// 	"date": "08.06.2020",
// 	"day": "87",
// 	"italy": "51350",
// 	"usa": "",
// 	"uk": "",
// 	"south_korea": "12950",
// 	"czech": "",
// 	"poland": ""
// 	},
// 	{
// 	"_id": "5ed0daccb74a53199c057dd1",
// 	"date": "09.06.2020",
// 	"day": "88",
// 	"italy": "52460",
// 	"usa": "",
// 	"uk": "",
// 	"south_korea": "13040",
// 	"czech": "",
// 	"poland": ""
// 	}
// ]
 */

const apiUrl = "https://api-korona-wirus.pl"
const apiKey = "27881261-6dbc-4867-a13d-a4f8541dc193"

func main() {
	// TODO: mayby add cache
	
	http.HandleFunc("/", apiBinds)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
