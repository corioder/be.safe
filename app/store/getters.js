import colorByName from '@/utils/colorByName';
import proxyArrayProperties from '@/utils/proxyArrayProperties';
import fetchFromRDS from '@/utils/fetchFromRDS';
import fetchData from '@/utils/fetchData';
import roundTo2Places from '@/utils/roundTo2Places';
import spacesInNum from '@/utils/spacesInNum';
import dateToArrOfStrings from '@/utils/dateToArrOfStrings';

export default {
	getCategoriesForHome(state) {
		return state.categories.filter((category) => {
			if (category.displayOnHomepage) return true;
			else return false;
		});
	},
	getDataForDate: (state) => (date) => {
		let data = [];
		if (date != '') {
			const stringDates = dateToArrOfStrings(date);
			const days = [];
			for (const i in stringDates) days.push(state.data.perday.find((day) => day.date == stringDates[i]));
			for (let i = 0; i < 2; i++) days[i].activePerHoundredThousand = (days[i].active * 100000) / 38354000;

			const calculateData = (days, type) => {
				for (const i in type) {
					data[i] = {
						name: type[i].name,
						isPositive: type[i].isPositive,
						amount: days[0][type[i].todayName],
						amountOfNew: days[0][type[i].todayName] - days[1][type[i].todayName],
						percentChange: (days[0][type[i].todayName] * 100) / days[1][type[i].todayName] - 100,
					};
				}
				return data;
			};

			const calculateConfirmedPerTests = (data, days) => {
				const confirmedPerTests = data[0].amountOfNew / data[6].amountOfNew;
				const yesterdayConfirmedPerTests = (days[1].confirmed - days[2].confirmed) / (days[1].tests - days[2].tests);
				data[data.length - 1].amount = confirmedPerTests;
				data[data.length - 1].amountOfNew = confirmedPerTests - yesterdayConfirmedPerTests;
				data[data.length - 1].percentChange = (confirmedPerTests * 100) / yesterdayConfirmedPerTests - 100;
				return data;
			};

			const normalizeData = (data) => {
				for (let i in data) {
					data[i].amount = spacesInNum(roundTo2Places(data[i].amount));
					data[i].amountOfNew =
						data[i].amountOfNew >= 0 ? '+' + spacesInNum(roundTo2Places(data[i].amountOfNew)) : spacesInNum(roundTo2Places(data[i].amountOfNew));
					data[i].percentChange =
						data[i].percentChange >= 0 ? '+' + spacesInNum(roundTo2Places(data[i].percentChange)) : spacesInNum(roundTo2Places(data[i].percentChange));
				}
				return data;
			};

			const type = [
				{
					name: 'potwierdzonych przypadków',
					isPositive: false,
					displayOnHomepage: true,
					todayName: 'confirmed',
				},
				{
					name: 'aktywnych przypadków',
					isPositive: false,
					displayOnHomepage: true,
					todayName: 'active',
				},
				{
					name: 'zgonów',
					isPositive: false,
					displayOnHomepage: true,
					todayName: 'deaths',
				},
				{
					name: 'wyzdrowiałych',
					isPositive: true,
					displayOnHomepage: true,
					todayName: 'recovered',
				},
				{
					name: 'osób na kwarantannie',
					isPositive: false,
					displayOnHomepage: false,
					todayName: 'quarantine',
				},
				{
					name: 'objętych nadzorem epidemologicznym',
					isPositive: false,
					displayOnHomepage: false,
					todayName: 'supervision',
				},
				{
					name: 'testów',
					isPositive: true,
					displayOnHomepage: true,
					todayName: 'tests',
				},
				{
					name: 'przetestowanych osób',
					isPositive: true,
					displayOnHomepage: false,
					todayName: 'people_tested',
				},
				{
					name: 'testów negatywnych',
					isPositive: true,
					displayOnHomepage: false,
					todayName: 'negative_tests',
				},
				{
					name: 'hospitalizowanych',
					isPositive: false,
					displayOnHomepage: false,
					todayName: 'hospitalized',
				},
				{
					name: 'zajętych respiratorów',
					isPositive: false,
					displayOnHomepage: false,
					todayName: 'respirators',
				},
				{
					name: 'aktywnych przypadków na 100 000 osób',
					isPositive: false,
					displayOnHomepage: false,
					todayName: 'activePerHoundredThousand',
				},
				{
					name: 'stosunek dzisiejszej liczby nowych chorych do liczby testów wykonanych dzisiaj',
					isPositive: false,
					displayOnHomepage: false,
					todayName: 'confirmedPerTests',
				},
			];

			data = calculateData(days, type);
			data = calculateConfirmedPerTests(data, days);
			data = normalizeData(data);
		}
		return data;
	},
	getColorByName: (state) => (text) => colorByName(text),
	getChartData(state) {
		return (chartType) => {
			return {
				data: proxyArrayProperties(state.data.perday, `${chartType}`, (n) => Number(n)),
				categories: proxyArrayProperties(state.data.perday, `date`),
			};
		};
	},
	getTable(state) {
		return async () => {
			let data = null;
			if (state.table.countries?.length > 0) data = state.table;
			else {
				try {
					data = await fetchData(state.APIS.API, state.APIS.TAB_ENPOINT);
					state.table = data;
				} catch (err) {
					throw err;
				}
			}
			return data;
		};
	},
	getInternationalAPHT(state) {
		return async () => {
			let data = null;
			if (state.internationalAPHT.length > 0) data = state.internationalAPHT;
			else {
				try {
					data = await fetchData(state.APIS.API, state.APIS.INT_ENPOINT);
					state.internationalAPHT = data;
				} catch (err) {
					throw err;
				}
			}

			return data;
		};
	},
	getInternationalData(state) {
		return async (countryCode) => {
			let data = null;
			if (state.international[countryCode]) data = state.international[countryCode];
			else {
				try {
					data = await fetchFromRDS(countryCode);
					state.international[countryCode] = data;
				} catch (err) {
					throw err;
				}
			}
			return data;
		};
	},
};
