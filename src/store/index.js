import Vuex from "vuex";
import Vue from "vue";

import auth from "./modules/Auth";
import admin from "./modules/Admin";
import post from "./modules/Post";
import chat from "./modules/Chat";
import prof from "./modules/Prof"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: [],
    success: ""
  },

  getters: {
    errors: state => state.errors,
    success: state => state.success
  },

  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    },
    setSuccess(state, success){
      state.success = success;
    }
  },

  modules: {
    auth,
    admin,
    post,
    chat,
    prof
  },
});
