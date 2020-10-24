export default {
	unexpectedErr: 'Ojej ten error zaskoczył nas nie mniej niż Ciebie...\nżartujemy, przecież gdyby tak było, nie przygotowalibyśmy tego komunikatu.',
	retryTimeout: 15000,
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
		INT_ENPOINT: 'int/',
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
	categories: [],
	articles: [],
	articlesErr: undefined,
	map: {},
	mapErr: undefined,
	international: {},
	internationalActivePerHoundredThousand: [],
};
