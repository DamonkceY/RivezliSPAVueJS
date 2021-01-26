import axios from "axios";
// import router from "@/router/index";
const state = {
  departments: null,
  groups: null,
  profs: null
};
const getters = {
  departments: state => state.departments,
  groups: state => state.groups,
  profs: state => state.profs
};
const actions = {
  async addDep({ commit }, data) {
    data = {
      name: data
    };
    await axios
      .post("http://127.0.0.1:8000/api/admin/department/add", data)
      .then(response => {
        state.departments.push(response.data.dep);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async addRelation({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/admin/prof/relateProf", data)
      .then(response => {
        state.profs[state.profs.findIndex(e => e.id == response.data.prof.id)] =
          response.data.prof;
        // console.log(state.profs[state.profs.findIndex(e => e.id == response.data.prof.id)])
        console.log(state.profs);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async allGroups({ commit }) {
    await axios
      .get("http://127.0.0.1:8000/api/admin/allG")
      .then(response => {
        commit("setGs", response.data.groups);
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
  async allProfs({ commit }) {
    await axios
      .get("http://127.0.0.1:8000/api/admin/allProfs")
      .then(response => {
        commit("setProfs", response.data.profs);
        console.log(response.data.profs);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },
  async allDepartment({ commit }) {
    await axios
      .get("http://127.0.0.1:8000/api/admin/allDep")
      .then(response => {
        commit("setDeps", response.data.dep);
        console.log(response.data.dep);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async updateDep({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/admin/department/update", data)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async updateG({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/admin/group/update", data)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async addG({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/admin/group/add", data)
      .then(response => {
        // console.log(response.data.message);
        state.groups.push(response.data.group);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async addProf({ commit }, data) {
    await axios
      .post("http://127.0.0.1:8000/api/admin/prof/add", data)
      .then(response => {
        // console.log(response.data.message);
        state.profs.push(response.data.prof);
      })
      .catch(error => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },

  async deleteDep({ commit }, data) {
    console.log(data);
    await axios
      .post("http://127.0.0.1:8000/api/admin/department/delete", data)
      .then(response => {
        console.log(response.data.message);
        state.departments = state.departments.filter(e => e.id != data.id);
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
  setDeps(state, deps) {
    state.departments = deps;
  },
  setGs(state, gs) {
    state.groups = gs;
  },
  setProfs(state, p) {
    state.profs = p;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
