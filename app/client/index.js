import Vue from "vue";

import App from "./App.vue";
import router from "./router.js";
import store from "./store.js";

Vue.config.productionTip = false;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

const testObject = {
  // a: {
  //   b: {
  //     c: 2
  //   }
  // }
};


console.log(testObject?.a?.b)

new Vue({
  router,
  store,
  el: "#root",
  render: h => h(App)
});
