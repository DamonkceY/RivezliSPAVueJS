<template>
  <div class="row" v-if="this.group">
    <div class="col-md-12">
      <li class="list-group-item active">MessageBox {{ this.group.name }}</li>
      <ul class="list-group" v-chat-scroll>
        <message
          :message="item"
          v-for="item in this.getMessages"
          :key="item.index"
        ></message>
      </ul>
      <input
        class="form-control"
        type="text"
        placeholder="Send Message"
        v-model="content"
        @keyup.enter="send"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import message from "./Message.vue";
import Echo from "laravel-echo";

export default {
  data: function() {
    return {
      content: "",
      // messages: [],
      group: {},
    };
  },
  components: {
    message,
  },
  computed: {
    ...mapGetters(["errors", "success"]),
    ...mapGetters("chat", ["getMessages"]),
  },
  mounted() {
    
    window.Pusher = require("pusher-js");

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "14b8ea1a2132fb92bdb0",
      cluster: "eu",
      forceTLS: true,
    });

    window.Echo.channel("MessageChannel").listen("MessageEvent", (e) => {
      this.getMessages.push(e);
    });

    this.group = JSON.parse(localStorage.getItem("group"));
    // console.log(this.group.id);
    this.getAllMessages(this.group);
    // console.log(this.getMessages)
  },

  methods: {
    ...mapActions("chat", ["getAllMessages","sendMessage"]),
    send() {
      if (this.content.length > 0) {
        let data = {
          content: this.content,
          group_id: this.group.id,
        };
        this.sendMessage(data);
        this.content = "";
      }
    },
  },
};
</script>

<style scoped>
.list-group {
  overflow-y: scroll;
  height: 440px;
}
.row {
  position: fixed;
  /* width:100%; */
  /* bottom: 0; */
  width: 470px;
}
</style>
