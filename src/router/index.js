import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/LoginForm.vue";
import Register from "../components/RegisterForm.vue";
import AdminHome from "../components/Administration/Home.vue";
import manageDepartments from "../components/Administration/Manage/ManageDepartments.vue";
import manageGroups from "../components/Administration/Manage/ManageGroups.vue";
import manageProfessors from "../components/Administration/Manage/ManageProfessors.vue";
import PostMother from "../components/Layout/PostMother.vue";
import Profile from "../components/Layout/Profile.vue";
import OthersProfile from "../components/Layout/OthersProfile.vue";
import listDep from "../components/Administration/Manage/manDep/list";
import listG from "../components/Administration/Manage/manG/list";
import listP from "../components/Administration/Manage/manP/list";
import manageCourse from "../components/Prof/manageCourse";
import groups from "../components/Prof/groups"
import course from "../components/Prof/course"
import courses from "../components/Layout/courses"
import coursesId from "../components/Layout/courseId"
import { guest, auth, admin } from "./middlewares";
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/messageBox",
  //   name: "messageBox",
  //   components:{
  //     HomeView: MessageRoom
  //   }

  // },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: guest,
    components: {
      HomeView: Login
    }
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: guest,
    components: {
      HomeView: Register
    }
  },
  {
    path: "/home",
    name: "Home",
    beforeEnter: auth,
    components: {
      HomeView: Home
    },
    children: [
      {
        path: "/manageCourse",
        beforeEnter: auth,
        components: {
          HomeRouter: manageCourse
        }
      },
      {
        path: "/group/:id",
        // beforeEnter: auth,
        components: {
          HomeRouter: groups
        }
      },
      {
        path: "/course/:id",
        // beforeEnter: auth,
        components: {
          HomeRouter: course
        }
      },
      {
        path: "/courses",
        // beforeEnter: auth,
        components: {
          HomeRouter: courses
        }
      },
      {
        path: "/courses/:id",
        // beforeEnter: auth,
        components: {
          HomeRouter: coursesId
        }
      },
      {
        path: "/profile",
        beforeEnter: auth,
        components: {
          HomeRouter: Profile
        }
      },
      {
        path: "/userProfile/:id",
        beforeEnter: auth,
        components: {
          HomeRouter: OthersProfile
        }
      },
      {
        path: "/",
        beforeEnter: auth,
        components: {
          HomeRouter: PostMother
        }
      }
    ]
  },

  {
    path: "/adminHome",
    name: "adminHome",
    beforeEnter: admin,
    components: {
      HomeView: AdminHome
    },
    children: [
      // {
      //   path: "/adminHome",
      //   components: {
      //     manageView: Home,
      //   },
      // },
      {
        path: "/adminHome",
        components: {
          manageView: manageDepartments
        },
        children: [
          {
            path: "/",
            components: {
              manDep: listDep
            }
          }
        ]
      },
      {
        path: "/manageGroups",
        components: {
          manageView: manageGroups
        },
        children: [
          {
            path: "/",
            components: {
              manG: listG
            }
          }
        ]
      },
      {
        path: "/manageProfessors",
        components: {
          manageView: manageProfessors
        },
        children: [
          {
            path: "/",
            components: {
              manP: listP
            }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
