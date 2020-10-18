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
  CATEGORIES(state, payload) {
    const type = [
      {
        name: 'Potwierdzone przypadki',
        isPositive: false,
        displayOnHomepage: true,
      },
      {
        name: 'Aktywne przypadki',
        isPositive: false,
        displayOnHomepage: true,
      },
      {
        name: 'Zgony',
        isPositive: false,
        displayOnHomepage: true,
      },
      {
        name: 'Liczba wyzdrowiałych',
        isPositive: true,
        displayOnHomepage: true,
      },
      {
        name: 'Kwarantanna',
        isPositive: false,
        displayOnHomepage: false,
      },
      {
        name: 'Nadzór epidemologiczny',
        isPositive: false,
        displayOnHomepage: false,
      },
      {
        name: 'Liczba testów',
        isPositive: true,
        displayOnHomepage: true,
      },
      {
        name: 'Przetestowane osoby',
        isPositive: true,
        displayOnHomepage: false,
      },
      {
        name: 'Liczba testów negatywnych',
        isPositive: true,
        displayOnHomepage: false,
      },
      {
        name: 'Liczba hospitalizowanych',
        isPositive: false,
        displayOnHomepage: false,
      },
      {
        name: 'Zajęte respiratory',
        isPositive: false,
        displayOnHomepage: false,
      },
    ];
    let categories = payload;
    for (let i in payload) {
      categories[i].isPositive = type[i].isPositive;
      categories[i].displayOnHomepage = type[i].displayOnHomepage;
      categories[i].name = type[i].name;
    }
    state.categories = categories;
  },
  NAVOPEN(state) {
    state.isNavOpened = !state.isNavOpened;
  },
};
