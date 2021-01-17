<template>
  <!-- <form @submit.prevent="register">
    <div class="form-group">
      <label for="exampleInputFullName">
        Full Name
      </label>
      <input
        type="text"
        name="Name"
        v-model="details.name"
        class="form-control"
        id="exampleInputFullName"
      />
    </div>

    <div class="form-group">
      <label for="exampleInputEmail1">
        Email address
      </label>
      <input
        type="email"
        name="Email"
        v-model="details.email"
        class="form-control"
        id="exampleInputEmail1"
      />
    </div>

    <div class="form-group">
      <label for="exampleInputPassword1">
        Password
      </label>
      <input
        type="password"
        name="Password"
        v-model="details.password"
        @input="confPass()"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword2">
        Confirm Password
      </label>
      <input
        type="password"
        name="ConfirmPassword"
        v-model="details.password_confirmation"
        
        class="form-control"
        id="exampleInputPassword2"
      />
    </div>

    <button type="submit" class="btn btn-primary">
      Submit
    </button>
  </form> -->
  <div class="container-fluid wrap">
    <div class="row ">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form @submit.prevent="register" style="margin-top:50px">
          <h2>Register Form</h2>
          <br />

          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              id="email"
              v-model="details.email"
            />
            <div class="invalid-feedback " v-if="errors.email">
              {{ errors.email[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="details.name"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
            />
            <div class="invalid-feedback " v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              id="password"
              v-model="details.password"
            />
            <div class="invalid-feedback " v-if="errors.password">
              {{ errors.password[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="passwordConf">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="passwordConf"
              v-model="details.password_confirmation"
            />
          </div>
          <div class="form-group">
            <label for="passwordConf">Select Your group</label>
            <select class="form-control" id="group">
              <option v-for="item in this.groups" :key="item.id" :value="item.id"> {{item.name}} </option>
            </select>
          </div>

          <label>
            <div v-if="success" class="alert alert-success " role="alert">
              {{ success }} :
              <router-link to="/login">Login</router-link>
            </div>
          </label>
          <button type="submit" class="btn btn-primary btn-block">
            Register
          </button>
          <div style="margin-top:10px">
            <router-link to="/login">Login</router-link>
          </div>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios"
export default {
  data: function() {
    return {
      details: {},
      groups:{},
    };
  },

  computed: {
    ...mapGetters(["errors", "success"]),
  },

  mounted() {
    this.$store.commit("setErrors", {});
    this.$store.commit("setSuccess", "");
    axios.get("http://127.0.0.1:8000/api/getGroups").then((response)=>{
      console.log(response.data.groups)
      this.groups = response.data.groups
    }).catch((error)=>{
      console.log(error)
    })
  },

  methods: {
    ...mapActions("auth", ["sendRegisterRequest"]),

    register() {
      
      this.details.group_id = document.getElementById("group").value;
      this.sendRegisterRequest(this.details);
    },
  },
};
</script>

<style></style>
