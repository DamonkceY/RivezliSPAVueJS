import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueChatScroll from "vue-chat-scroll";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(Loading)

Vue.use(VueSweetalert2);

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
