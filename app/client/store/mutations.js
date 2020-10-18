export default {
  PERDAY(state, payload) {
    state.data.perday = payload;
    state.data.today = payload[payload.length - 1];
    state.data.yesterday = payload[payload.length - 2];
    console.log(payload[payload.length - 1]);
  },
  COMMON(state, payload) {
    state.data.common = payload;
  },
  PROVINCES(state, payload) {
    state.data.provinces = payload;
  },
  COUNTRYPERDAY(state, payload) {
    state.data.countryperday = payload;
  },
  PROGNOSIS(state, payload) {
    state.data.prognosis = payload;
  },
  ATEGORIES(state, payload) {
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
        name: 'przypadków na 100 000',
        isPositive: false,
        displayOnHomepage: false,
        todayName: 'activePerHoundredThousand',
      },
    ];
    let categories = payload;
    for (let i in payload) {
      categories[i].isPositive = type[i].isPositive;
      categories[i].displayOnHomepage = type[i].displayOnHomepage;
      categories[i].name = type[i].name;
      categories[i].amount = state.data.today[type[i].todayName];
    }

    state.categories = categories;
  },
  NAVOPEN(state) {
    state.isNavOpened = !state.isNavOpened;
  },
};
