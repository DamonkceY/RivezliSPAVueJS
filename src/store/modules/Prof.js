import axios from "axios";
// import router from "@/router/index";
const state = {
  groups: null,
  courses: null,
  CourseDetails:null
};
const getters = {
  groups: state => state.groups,
  courses: state => state.courses,
  CourseDetails: state => state.CourseDetails
};
const actions = {
  async getProfGroups({ commit }) {
    await axios
      .get("http://127.0.0.1:8000/api/prof/myG")
      .then(response => {
        commit("setGroups", response.data.groups);
        console.log(response.data.groups);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async getCourseDetails({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/prof/course/getCourseDetails", data)
      .then(response => {
          state.CourseDetails = response.data.course
        // console.log(response.data.course);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },
  async addCourse({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/prof/course/add", data)
      .then(response => {
        //   commit("setGroups", response.data.groups);
        // console.log(response.data.course);
        state.courses.push(response.data.course)
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },
  async addFileToCourse({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/prof/file/add", data)
      .then(response => {
        state.CourseDetails = response.data.course
        //   commit("setGroups", response.data.groups);
        // console.log(response.data.message);
        // state.courses.push(response.data.course)
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },
  async deleteFile({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/prof/file/delete", data)
      .then(response => {
          console.log(data)
          console.log(response.data.course)
        state.CourseDetails = response.data.course
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },
  
  async deleteCourse({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/prof/course/delete", data)
      .then(response => {
        state.courses = response.data.courses
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async getAllCoursesGroup({ commit },data) {
    await axios
      .post("http://127.0.0.1:8000/api/prof/course/getAllG",data)
      .then(response => {
        //   commit("setGroups", response.data.groups);
        console.log(data)
        console.log(response.data.courses);
        commit("setCourses",response.data.courses)
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  }

};
const mutations = {
  setGroups(state, grs) {
    state.groups = grs;
  },
  setCourses(state, crs) {
    state.courses = crs;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
