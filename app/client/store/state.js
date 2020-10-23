export default {
	isNavOpened: false,
	links: [
		{ component: 'home', path: '/' },
		{ component: 'informed', path: '/informed' },
		{ component: 'aware', path: '/aware' },
		{ component: 'preventive', path: '/preventive' },
	],
	APIS: {
		API_ENPOINT: 'api/',
		MAP_ENPOINT: 'map/',
		API: __API__, // webpack will resolve this, use .env API=apiUrl
		STRAPI: __STRAPI__, // webpack will resolve this, use .env STRAPI=strapiUrl
	},
	data: {
		perday: [],
		today: {},
		yesterday: {},
		common: {},
		provinces: {},
		countryperday: {},
		prognosis: {},
	},
	map: {},
	categories: [],
	articles: [],
};
