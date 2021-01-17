import axios from "axios";
import router from "@/router/index";
const state = {
  userData: null,
  userProfile: null,
};
const getters = {
  userData: (state) => state.userData,
  userProfile:(state) => state.userProfile,
};
const actions = {
  async getUserData({ commit }) {
    await axios.get("http://127.0.0.1:8000/api/auth/user").then((response) => {
      commit("setUserData", response.data);
    });
  },
  async getUserProfile({ commit },data) {
    await axios.get("http://127.0.0.1:8000/api/auth/getUserProfile/"+data).then((response) => {
      commit("setUserProfile", response.data.user);
    });
  },

  async sendLoginRequest({ commit }, data) {
    // console.log(data)
    await axios
      .post("http://127.0.0.1:8000/api/auth/login", data)
      .then((response) => {
        commit("setUserData", response.data.userData);
        localStorage.setItem("user", JSON.stringify(state.userData));
        localStorage.setItem("group", JSON.stringify(state.userData.group));
        // console.log(state.userData);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("role", state.userData.role);
        if (state.userData.role == 2) {
          // console.log("ok")
          router.push("/adminHome");
        } else {
          // console.log("not ok")
          router.push("/home");
        }
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async sendRegisterRequest({ commit }, data) {
    console.log(data);
    await axios
      .post("http://127.0.0.1:8000/api/auth/signup", data)
      .then((response) => {
        commit("setSuccess", response.data.message, { root: true });
      })
      .catch((error) => {
        console.log(error.response.data);
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },

  async sendLogoutRequest({ commit }) {
    await axios
      .get("http://127.0.0.1:8000/api/auth/logout")
      .then((response) => {
        router.go({
          name: "Login",
        });
        commit("setUserData", null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("group");
        commit("setSuccess", response.data.message, { root: true });
      });
  },
  async updateAvatar({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/auth/updateAvatar", data)
      .then((response) => {
        commit("setUserData", response.data.user);
        // localStorage.setItem(
        //   "avatars",
        //   "http://127.0.0.1:8000/storage/avatars/" + response.data.user.avatar
        // );
        console.log(response.data.message)
        commit("setSuccess", response.data.message, { root: true });
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },

  //   async updateUser({ commit }, data) {
  //     axios
  //       .post("http://127.0.0.1:8000/api/updateUser", data)
  //       .then((response) => {
  //         commit("setUserData", response.data.user);
  //         commit("setSuccess", response.data.message, { root: true });
  //       })
  //       .catch((error) => {
  //         commit("setErrors", error.response.data.errors, { root: true });
  //       });
  //   },
};
const mutations = {
  setUserData(state, user) {
    state.userData = user;
  },
  setUserProfile(state, user) {
    state.userProfile = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
