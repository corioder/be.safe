import Vue from "vue";

import App from "./App.vue";
import router from "./router.js";
import store from "./store/store.js";

Vue.config.productionTip = false;

if (!__IS_DEV__) {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }
}

async function main() {
  try {
    // some loading screen
    await store.dispatch("fetchData");
    new Vue({
      router,
      store,
      el: "#root",
      render: h => h(App)
    });
  } catch (err) {
    console.error(err);
  }
}

main();
