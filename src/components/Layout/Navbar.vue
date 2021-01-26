<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <router-link class="navbar-brand" to="/home">Rivezli.tn</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav ml-auto" v-if="userData">
        <li class="nav-item" v-if="userData.role == 2">
          <router-link
            class="nav-link"
            to="/adminHome"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            >Admin</router-link
          >
        </li>
        <li class="nav-item" v-if="userData.role == 1">
          <router-link
            class="nav-link"
            to="/managecourse"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            >Course</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            v-if="userData.role == 0"
            class="nav-link"
            to="/courses"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            >My Courses</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/home"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/profile"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            >Profile</router-link
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            @click.prevent="logout"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            >Logout</a
          >
        </li>
      </ul>
    </div>
      <ul class="navbar-nav ml-auto" v-if="!userData">
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/login"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/register"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            >Register</router-link
          >
        </li>
      </ul>
  </nav>
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data: function() {
    return {};
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      this.getUserData();
    }
  },
  computed: {
    ...mapGetters("auth", ["userData"]),
  },
  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "getUserData"]),
    logout: function() {
      this.sendLogoutRequest();
    },
    click: function() {
      console.log(this.userData);
    },
  },
};
</script>

<style></style>
