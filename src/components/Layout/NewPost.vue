<template>
  <div>
    <form @submit.prevent="post">
      <div class="form-group">
        <textarea
          placeholder="Post Something Useful"
          v-model="details.content"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="url"
          class="form-control"
          v-model="details.url"
          placeholder="Add Link"
        />
      </div>
      <a @click="$refs.file.click()" class="btn btn-primary">
        Import a file <i class="fa fa-upload"></i>
      </a>
      <input style="display: none;" type="file" ref="file" @change="getFile" />

      <button style="float: right;" type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: function() {
    return {
      details: {
        content: "",
        url: "",
        file: null,
      },
    };
  },
  computed: {
    ...mapGetters(["errors", "success"]),
  },

  mounted() {
    this.$store.commit("setErrors", {});
    this.$store.commit("setSuccess", "");
  },

  methods: {
    ...mapActions("post", ["addPostRequest"]),
    post() {
      if (this.details.content.length > 0) {
        // console.log(this.details.content)
        let formData = new FormData();
        formData.append("content", this.details.content);
        if (this.details.file != null) {
          formData.append("file", this.details.file);
        }

        if (this.details.url.length > 0) {
          formData.append("url", this.details.url);
        }
        this.addPostRequest(formData);

        this.details.content = "";
        this.details.url = "";
        this.details.file = null;
      }
    },
    getFile() {
      // let file = e.target.files[0];
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = (e) => {
      //   this.image = e.target.result;
      // };
      this.details.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style></style>
