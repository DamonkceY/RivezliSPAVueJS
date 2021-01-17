<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="d-flex justify-content-between p-2 px-3">
            <div class="d-flex flex-row align-items-center">
              <img
                :src="
                  'http://127.0.0.1:8000/storage/avatars/' +
                    this.item.user.avatar
                "
                width="50"
                height="50"
                class="rounded-circle"
              />
              <div class="d-flex flex-column ml-2">
                <span class="font-weight-bold">
                  <router-link :to="{path : '/userProfile/'+this.item.user.id}">{{ this.item.user.name }}</router-link>
                  <!-- <a :href="'http://127.0.0.1:8000/api/auth/getUserProfile/'+this.item.user.id"></a> -->
                  
                </span>
                <small class="text-primary">Student</small>
                <small class="mr-2">{{ this.item.created_at.substring(0,10)}} at {{this.item.created_at.substring(11,19)}} </small>
              </div>
            </div>
            <div class="d-flex flex-row mt-1 ellipsis">
              <i class="fa fa-ellipsis-h"></i>
            </div>
          </div>
          <hr />
          <p class="text-justify">
            {{ this.item.content }}
          </p>
          <br>
          <div v-if="this.item.image">
            <img
              :src="
                'http://127.0.0.1:8000/storage/postfiles/' + this.item.image
              "
              class="img-fluid"
            />
          </div>
          <div v-if="this.item.file">
            <a :href="'http://127.0.0.1:8000/storage/postfiles/' + this.item.file" target="_blank">Download</a>
          </div>
          
          <div v-if="this.item.url">
            <link-prevue :url="this.item.url" cardWidth="100%"></link-prevue>
          </div>
          

          <div class="p-2">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex flex-row icons d-flex align-items-center">
                <!-- <i class="fa fa-heart"></i> <i class="fa fa-smile-o ml-2"></i>  -->
              </div>
              <div class="d-flex flex-row muted-color">
                <span>{{ this.item.comments.length }} comments</span>
              </div>
            </div>
            <hr />
            <div class="comments">
              <div
                class="d-flex flex-row mb-2"
                v-for="comment in this.item.comments"
                :key="comment.id"
              >
                <img
                  :src="
                    'http://127.0.0.1:8000/storage/avatars/' +
                      comment.user.avatar
                  "
                  width="30"
                  height="30"
                  class="rounded-image"
                />
                <div class="d-flex flex-column ml-2">
                  <span class="name">{{ comment.user.name }}</span>
                  <small class="comment-text"> {{ comment.content }} </small>
                  <div class="d-flex flex-row align-items-center status">
                    <small> {{comment.created_at.substring(11,19)}} </small>
                  </div>
                </div>
              </div>

              <div class="comment-input">
                <input
                  placeholder="Comment Something Awesome !"
                  type="text"
                  v-model="commentDetails.content"
                  @keyup.enter="send"
                  class="form-control"
                />
                <!-- <div class="fonts"><i class="fa fa-camera"></i></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LinkPrevue from 'link-prevue'
import Echo from "laravel-echo";
export default {
  props: ["item"],
  data: function() {
    return {
      commentDetails: {
        content: "",
      },
    };
  },
  components:{
    LinkPrevue,
  },
  computed: {
    // ...mapGetters(["errors", "success"]),
  },

  mounted() {
    this.$store.commit("setErrors", {});
    this.$store.commit("setSuccess", "");

    window.Pusher = require("pusher-js");

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "6450ae6a57e02169054f",
      cluster: "eu",
      forceTLS: true,
    });

    window.Echo.channel("CommentChannel").listen("CommentEvent", (e) => {
      // this.getPosts.unshift(e.post);
      this.item.comments.push(e.comment)
      
    });
  },

  methods: {
    ...mapActions("post", ["sendComment"]),
    send() {
      if (this.commentDetails.content.length > 0) {
        this.commentDetails.post_id = this.item.id;
        this.sendComment(this.commentDetails);
        this.commentDetails.content = "";
      }
    },
  },
};
</script>

<style></style>
