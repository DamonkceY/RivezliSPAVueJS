<template>
  <div class="container-fluid">
    <br />
    <div class="row">
      <div class="col-md-7">
        <router-view name="HomeRouter"></router-view>
      </div>
      <div class="col-md-5"><message-box></message-box></div>
    </div>
  </div>
</template>

<script>
import MessageBox from "./Messenger/MessageRoom.vue";
export default {
  data: function() {
    return {};
  },
  components: {
    MessageBox,
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style></style>>
