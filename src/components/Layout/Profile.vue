<template>
  <div v-if="this.userData">
    <div>
      <div class="fb-profile">
      <img
        align="left"
        height="200"
        width="200"
        class="fb-image-profile thumbnail"
        :src="'http://127.0.0.1:8000/storage/avatars/' + this.userData.avatar"
        alt="Profile image example"
      />
      <div class="fb-profile-text">
        <h1>{{ userData.name }}</h1>
      </div>
    </div>

    <div class="row">
      <div style="padding-top:10px" class="col-md-12">
        <button @click="$refs.file.click()">Upload Image</button>
        <input
          style="display: none;"
          type="file"
          ref="file"
          @change="getImage"
        />
        <button v-on:click="submitFile()">Submit</button>
      </div>
    </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div v-if="this.getUserPosts">
          <div v-for="item in this.getUserPosts" :key="item.id">
            <hr />
            <post :item="item"></post>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Post from "./Post.vue";
export default {
  data: function() {
    return {
      file: null,
    };
  },
  components: {
    Post,
  },
  computed: {
    ...mapGetters("auth", ["userData"]),
    ...mapGetters(["errors", "success"]),
    ...mapGetters("post", ["getUserPosts"]),
  },
  mounted() {
    this.getAllUserPosts();
    // console.log(this.getUserPosts)
  },
  methods: {
    ...mapActions("auth", ["updateAvatar"]),
    ...mapActions("post", ["getAllUserPosts"]),
    submitFile() {
      let formData = new FormData();
      formData.append("avatar", this.file);
      this.updateAvatar(formData);
    },
    getImage() {
      // let img = e.target.files[0];
      // let reader = new FileReader();
      // reader.readAsDataURL(img);
      // reader.onload = (e) => {
      //   this.image = e.target.result;
      // };
      this.file = this.$refs.file.files[0];
    },
  },
};


</script>

<style scoped>
</style>
