import axios from "axios";
// import router from "@/router/index";
const state = {
  posts: null,
  userPosts: null
};
const getters = {
  getPosts: (state) => state.posts,
  getUserPosts: (state) => state.userPosts,
};
const actions = {
  async addPostRequest({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/post/add", data)
      .then(() => {
        // console.log("qsd");
        // response.data;
        // commit("pushPost", response.data.post);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },

  async getAllPosts({ commit }) {
    await axios
      .post("http://127.0.0.1:8000/api/post/getAll")
      .then((response) => {
        commit("setPosts", response.data.posts);
        // console.log(response.data.posts);
      })
      .catch((error) => {
        // console.log(error.response.data);
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },
  async getAllUserPosts({ commit }) {
    await axios
      .post("http://127.0.0.1:8000/api/post/getAllUser")
      .then((response) => {
        commit("setUserPosts", response.data.posts);
        // console.log(response.data.posts);
      })
      .catch((error) => {
        // console.log(error.response.data);
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },

  async sendComment({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/comment/add", data)
      .then(() => {
        // commit("pushComment", response.data.comment);
        // console.log(response.data.message)
      })
      .catch((error) => {
        console.log(error);
        commit("setErrors", error, { root: true });
      });
  },

};
const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setUserPosts(state, posts) {
    state.userPosts = posts;
  },
  pushPost(state, post) {
    state.posts.unshift(post);
  },
  pushComment(state, comment) {
    console.log(comment)
    const post = state.posts.find(element => element.id == comment.post_id);
    // console.log(post)
    post.comments.push(comment);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
