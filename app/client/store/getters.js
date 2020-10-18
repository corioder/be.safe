export default {
  getCategoriesForHome(state) {
    return state.categories.filter((category) => {
      if (category.displayOnHomepage) return true;
      else return false;
    });
  },
};
