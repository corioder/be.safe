// records: [
// 	[
// 		"2020-01-22", // date_stamp
// 		1, // cnt_confirmed
// 		0, // cnt_death
// 		0, // cnt_recovered
// 		0, // active
//    0, // active active per one hundred thousand
// 	]
// ]

import roundToTwoPlaces from './roundToTwoPlaces';

// data format
export const df = {
	date: 0,
	confirmed: 1,
	deaths: 2,
	recovered: 3,
	active: 4,
	activePerHoundredThousand: 5,
};

export default async (countryCode) => {
	let records;
	try {
		records = await rdsData(countryCode);
	} catch (err) {
		throw err;
	}

	let population = null;
	try {
		population = await populationData(countryCode);
	} catch (err) {
		console.error(err);
	}

	for (let i = 0; i < records.length; i++) {
		records[i][df.date] = fomatDate(new Date(records[i][df.date]));
		records[i][df.active] = Number(records[i][df.confirmed]) - Number(records[i][df.deaths]) - Number(records[i][df.recovered]);
		if (population != null) records[i][df.activePerHoundredThousand] = roundToTwoPlaces((records[i][df.active] * 100000) / population);
	}

	return records;
};

function fomatDate(date) {
	return `${formatToTwoDigits(date.getMonth().toString())}.${formatToTwoDigits(date.getDay().toString())}.${date.getFullYear()}`;
}

function formatToTwoDigits(string) {
	if (string.length == 1) string = `0${string}`;
	return string;
}

async function rdsData(countryCode) {
	try {
		const url = `https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=${countryCode})&limit=2500&orderBy=date_stamp&metadata=false`;
		const data = await fetchData(url);
		return data.records;
	} catch (err) {
		throw err;
	}
}

async function populationData(countryCode) {
	try {
		const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}?fields=population`;
		const data = await fetchData(url);
		return data.population;
	} catch (err) {
		throw err;
	}
}

async function fetchData(url) {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (err) {
		throw err;
	}
}
