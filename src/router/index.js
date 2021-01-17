import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/LoginForm.vue";
import Register from "../components/RegisterForm.vue";
import AdminHome from "../components/Administration/Home.vue";
import manageDepartments from "../components/Administration/Manage/ManageDepartments.vue";
import manageGroups from "../components/Administration/Manage/ManageGroups.vue";
import manageProfessors from "../components/Administration/Manage/ManageProfessors.vue";
import PostMother from "../components/Layout/PostMother.vue"
import Profile from "../components/Layout/Profile.vue";
import OthersProfile from "../components/Layout/OthersProfile.vue"

Vue.use(VueRouter);

const guest = (to, from, next) => {
  if (!localStorage.getItem("access_token")) {
    return next();
  } else {
    return next("/home");
  }
};

const auth = (to, from, next) => {
  if (localStorage.getItem("access_token")) {
    return next();
  } else {
    return next("/login");
  }
};
const admin = (to, from, next) => {
  if (localStorage.getItem("role") == 2) {
    return next();
  } else {
    return next("/home");
  }
};

const routes = [
  // {
  //   path: "/messageBox",
  //   name: "messageBox",
  //   components:{
  //     HomeView: MessageRoom
  //   }

  // },

  {
    path: "/login",
    name: "Login",
    beforeEnter: guest,
    components: {
      HomeView: Login,
    },
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: guest,
    components: {
      HomeView: Register,
    },
  },
  {
    path: "/home",
    name: "Home",
    beforeEnter: auth,
    components: {
      HomeView: Home,
    },
    children: [
      {
        path: "/profile",
        beforeEnter: auth,
        components: {
          HomeRouter: Profile,
        },
      },
      {
        path: "/userProfile/:id",
        beforeEnter: auth,
        components: {
          HomeRouter: OthersProfile,
        },
      },
      {
        path: "/",
        beforeEnter: auth,
        components: {
          HomeRouter: PostMother,
        },
      },
    ],
  },

  {
    path: "/adminHome",
    name: "adminHome",
    beforeEnter: admin,
    components: {
      HomeView: AdminHome,
    },
    children: [
      {
        path: "/",
        components: {
          manageView: Home,
        },
      },
      {
        path: "/manageDepartments",
        components: {
          manageView: manageDepartments,
        },
      },
      {
        path: "/manageGroups",
        components: {
          manageView: manageGroups,
        },
      },
      {
        path: "/manageProfessors",
        components: {
          manageView: manageProfessors,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
