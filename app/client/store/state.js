export default {
  isNavOpened: false,
  links: [
    { component: 'home', path: '/' },
    { component: 'aware', path: '/aware' },
    { component: 'informed', path: '/informed' },
    { component: 'proactive', path: '/proactive' },
  ],
  APIS: {
    API: __API__, // webpack will resolve this, use .env API=apiUrl
    STRAPI: __STRAPI__, // webpack will resolve this, use .env STRAPI=strapiUrl
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
};
