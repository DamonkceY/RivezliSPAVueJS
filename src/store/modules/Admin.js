// import axios from "axios";
// import router from "@/router/index";
const state = {
  // userData: null,
};
const getters = {
  //   userData: (state) => state.userData,
};
const actions = {
  // async addDepartment({ commit }, data) {
  //   await axios
  //     .get("http://127.0.0.1:8000/api/admin/department/add", data)
  //     .then((response) => {
  //       // commit("setUserData", response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response.data.message === "Unauthorized") {
  //         commit("setErrors", error.response.data, { root: true });
  //       } else {
  //         commit("setErrors", error.response.data.errors, { root: true });
  //       }
  //     });
  // },
  //   async sendLoginRequest({ commit }, data) {
  //     // console.log(data)
  //     await axios
  //       .post("http://127.0.0.1:8000/api/auth/login", data)
  //       .then((response) => {
  //         commit("setUserData", response.data.userData);
  //         console.log(state.userData);
  //         localStorage.setItem("access_token", response.data.access_token);
  //         if (state.userData.role == 2) {
  //           console.log("ok")
  //           router.push('/adminHome')
  //         } else {
  //           console.log("not ok")
  //           router.push('/home')
  //         }
  //       })
  //       .catch((error) => {
  //         if (error.response.data.message === "Unauthorized") {
  //           commit("setErrors", error.response.data, { root: true });
  //         } else {
  //           commit("setErrors", error.response.data.errors, { root: true });
  //         }
  //       });
  //   },
  //   async sendRegisterRequest({ commit }, data) {
  //     console.log(data);
  //     await axios
  //       .post("http://127.0.0.1:8000/api/auth/signup", data)
  //       .then((response) => {
  //         commit("setSuccess", response.data.message, { root: true });
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data);
  //         commit("setErrors", error.response.data.errors, { root: true });
  //       });
  //   },
  //   async sendLogoutRequest({ commit }) {
  //     await axios
  //       .get("http://127.0.0.1:8000/api/auth/logout")
  //       .then((response) => {
  //         router.go({
  //           name: "Login",
  //         });
  //         commit("setUserData", null);
  //         localStorage.removeItem("access_token");
  //         commit("setSuccess", response.data.message, { root: true });
  //       });
  //   },
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
  //   setUserData(state, user) {
  //     state.userData = user;
  //   },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
