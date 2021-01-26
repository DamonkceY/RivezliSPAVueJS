<template>
  <div>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-12"><new-post></new-post></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div v-if="this.getPosts">
          <div v-for="item in this.getPosts" :key="item.id">
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
import NewPost from "./NewPost.vue";
import Post from "./Post.vue";
import { mapGetters, mapActions } from "vuex";
import Echo from "laravel-echo";
export default {
  data: function() {
    return {
      // posts: []
    };
  },
  components: {
    NewPost,
    Post,
  },
  computed: {
    ...mapGetters(["errors", "success"]),
    ...mapGetters("post", ["getPosts"]),
  },
  mounted() {
    this.getAllPosts();
    window.Pusher = require("pusher-js");

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "14b8ea1a2132fb92bdb0",
      cluster: "eu",
      forceTLS: true,
    });

    window.Echo.channel("PostChannel").listen("PostEvent", (e) => {
      this.getPosts.unshift(e.post);
      
    });
  },
  methods: {
    ...mapActions("post", ["getAllPosts"]),
  },
};
</script>

<style></style>
