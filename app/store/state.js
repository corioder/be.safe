export default {
	unexpectedErr: 'Ojej ten error zaskoczył nas nie mniej niż Ciebie...<br/>żartujemy, przecież gdyby tak było, nie przygotowalibyśmy tego komunikatu.',
	retryTimeout: 30000,
	isNavOpened: false,
	links: [
		{ component: 'home', path: '/' },
		{ component: 'informed', path: '/informed' },
		{ component: 'aware', path: '/aware' },
		{ component: 'preventive', path: '/preventive' },
	],
	APIS: {
		API_ENPOINT: 'api/',
		TAB_ENPOINT: 'tab/',
		INT_ENPOINT: 'int/',
		API: __API__, // webpack will resolve this, use .env API=apiUrl
	},
	data: {
		perday: [],
		today: {},
		yesterday: {},
	},
	table: {},
	international: {},
	internationalAPHT: [],
};
