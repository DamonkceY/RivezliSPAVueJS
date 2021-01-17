import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueChatScroll from "vue-chat-scroll";

Vue.use(VueChatScroll);

Vue.config.productionTip = false;

axios.interceptors.request.use(function(config) {
  config.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    // access-control-allow-origin: *
  };

  return config;
});

new Vue({
  VueChatScroll,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
