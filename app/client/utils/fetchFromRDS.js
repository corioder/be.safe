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

// data format
const df = {
	confirmed: 0,
	death: 1,
	recovered: 2,
	active: 3,
	activePerHoundredThousand: 4,
};

export default async (countryCode) => {
	const url = `https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=${countryCode})&limit=2500&orderBy=date_stamp&metadata=false`;
	const response = await fetch(url);
	const records = (await response.json()).records;

	for (let i = 0; i < records.length; i++) {
		records[i][df.active] = Number(records[i][df.confirmed]) - Number(records[i][df.death]) - Number(records[i][df.recovered]);
		records[i][df.activePerHoundredThousand] = records[i][df.active] 
	}

	return;
};
