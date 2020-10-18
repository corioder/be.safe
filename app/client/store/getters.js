import colorByName from './components/colorByName'

export default {
  getCategoriesForHome(state) {
    return state.categories.filter(category => {
      if (category.displayOnHomepage) return true;
      else return false;
    });
  },
  getColorByName: state => text => colorByName(text),
  getChartData(state) {
    return chartType => {
      return {
        data: new Proxy(state.data.perday, {
          get(obj, prop) {
            if (!isNaN(Number(prop))) {
              return Number(obj[prop][chartType]);
            }
            return obj[prop];
          }
        }),
        dates: new Proxy(state.data.perday, {
          get(obj, prop) {
            if (!isNaN(Number(prop))) {
              return obj[prop]["date"];
            }
            return obj[prop];
          }
        })
      };
    };
  }
};
