import axios from "axios";
// import router from "@/router/index";
const state = {
  messages: null,
};
const getters = {
  getMessages: (state) => state.messages,
};
const actions = {
  async getAllMessages({ commit }, data) {
    console.log(data);
    await axios
      .post("http://127.0.0.1:8000/api/auth/getGroupMessages", data)
      .then((response) => {
        commit("setMessages", response.data.messages);
        // console.log(response.data.messages);
      })
      .catch((error) => {
        console.log(error.data);
      });
  },

  async sendMessage({ commit }, data) {
    axios
      .post("http://127.0.0.1:8000/api/auth/send", data)
      .then((response) => {
        // commit('pushMessage',response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
        console.log(error.data);
      });
  },

  //   async getAllPosts({ commit }) {
  //     await axios
  //       .post("http://127.0.0.1:8000/api/post/getAll")
  //       .then((response) => {
  //         commit("setPosts", response.data.posts);
  //         console.log(response.data.posts);
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data);
  //         commit("setErrors", error.response.data.errors, { root: true });
  //       });
  //   },
};
const mutations = {
  setMessages(state, messages) {
    state.messages = messages;
  },
  pushMessage(state, message) {
    state.messages.push(message);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
