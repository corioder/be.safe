import preloadImgs from '@/utils/preloadImgs';
import proxyArrayProperties from '@/utils/proxyArrayProperties';
import spacesInNum from '@/utils/spacesInNum';
import roundTo2Places from '@/utils/roundTo2Places';
import smallPhoto from '@/utils/smallPhoto';

export default {
	PERDAY(state, payload) {
		state.data.perday = payload;
		state.data.today = payload[payload.length - 1];
		state.data.yesterday = payload[payload.length - 2];
	},
	CATEGORIES(state, payload) {
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
				name: 'średnia nowych przypadków w ostatnim tygodniu',
				isPositive: false,
				displayOnHomepage: false,
				todayName: 'activePerHoundredThousand',
			},
			{
				name: 'średnia nowych przypadków w ostatnim tygodniu na 100 000 osób',
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
		let categories = payload;
		for (const i in categories) {
			categories[i].isPositive = type[i].isPositive;
			categories[i].displayOnHomepage = type[i].displayOnHomepage;
			categories[i].name = type[i].name;
			categories[i].amount = spacesInNum(roundTo2Places(state.data.today[type[i].todayName] || payload[i].amount));
			categories[i].amountOfNew = categories[i].amountOfNew >= 0 ? '+' + spacesInNum(categories[i].amountOfNew) : spacesInNum(categories[i].amountOfNew);
			categories[i].percentChange =
				categories[i].percentChange >= 0 ? '+' + spacesInNum(categories[i].percentChange) : spacesInNum(categories[i].percentChange);
		}
		state.categories = categories;
	},
	ARTICLES(state, payload) {
		const articles = payload.sort((a, b) => new Date(b.date) - new Date(a.date));
		state.articles = articles;
		try {
			preloadImgs(proxyArrayProperties(state.articles, 'mainphoto.url', (url) => `${state.APIS.STRAPI}${url}`));
			preloadImgs(proxyArrayProperties(state.articles, 'mainphoto.url', (url) => `${state.APIS.STRAPI}${smallPhoto(url)}`));
		} catch (err) {}
	},
	NAVOPEN(state) {
		state.isNavOpened = !state.isNavOpened;
	},
};
