export default {
  isNavOpened: false,
  links: [
    { component: 'home', path: '/' },
    { component: 'informed', path: '/informed' },
    { component: 'aware', path: '/aware' },
    { component: 'preventive', path: '/preventive' },
  ],
  APIS: {
    API: __API__, // webpack will resolve this, use .env API=apiUrl
    STRAPI: 'https://besafedb.herokuapp.com',
    TWITTER: __TWITTER__, // webpack will resolve this, use .env TWITTER=twitterUrl
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
};
