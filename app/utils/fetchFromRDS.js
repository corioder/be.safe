// records: [
// 	[
// 		'2020-01-22', /* date_stamp */
// 		1, /* cnt_confirmed */
// 		0, /* cnt_death */
// 		0, /* cnt_recovered */
// 		0, /* active */
// 	]
// ]

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
	const recordsPromise = rdsData(countryCode);

	let records;
	try {
		records = await recordsPromise;
	} catch (err) {
		throw err;
	}

	for (let i = 0; i < records.length; i++) {
		records[i][df.date] = fomatDate(records[i][df.date]);
		records[i][df.active] = Number(records[i][df.confirmed]) - Number(records[i][df.deaths]) - Number(records[i][df.recovered]);
	}

	return records;
};

function fomatDate(date) {
	const sdate = date.split('-');
	return `${sdate[2]}.${sdate[1]}.${sdate[0]}`
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

async function fetchData(url) {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (err) {
		throw err;
	}
}
