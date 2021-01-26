<template>
  <div v-if="this.userProfile">
    <!-- {{this.userProfile}} -->
    <div>
      <div class="fb-profile">
        <img
          align="left"
          height="200"
          width="200"
          class="fb-image-profile thumbnail"
          :src="
            'http://127.0.0.1:8000/storage/avatars/' + this.userProfile.avatar
          "
          alt="Profile image example"
        />
        <div class="fb-profile-text">
          <h1>{{ userProfile.name }}</h1>
        </div>
      </div>
    </div>

    <br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br />

    <div class="row">
      <div class="col-md-12">
        <div v-if="this.userProfile.posts">
          <div v-for="item in this.userProfile.posts" :key="item.id">
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
import { mapActions, mapGetters } from "vuex"
import Post from "./Post.vue"
export default {
  data: function() {
    return {
      file: null,
    }
  },
  components: {
    Post,
  },
  computed: {
    ...mapGetters("auth", ["userProfile"]),
    ...mapGetters(["errors", "success"]),
  },
  mounted() {
    //   console.log()
    this.getUserProfile(this.$route.params.id)
    // console.log(this.userProfile)
  },
  methods: {
    ...mapActions("auth", ["getUserProfile"]),
  },
}
</script>

<style scoped></style>
