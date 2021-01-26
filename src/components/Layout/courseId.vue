<template>
  <div>
      <h3 v-if="courseId"> {{courseId.name}} </h3>

      <hr>

      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Teacher Name</th>
          <th scope="col">File Name</th>
          <th scope="col">Path</th>
        </tr>
      </thead>

      <tbody v-if="courseId">
        <tr v-for="item in courseId.files" :key="item.id">
          <th scope="row"></th>
          <td>{{ courseId.user.name }}</td>
          <td>{{ item.name }}</td>
          <td>
            <a :href="'http://127.0.0.1:8000/storage/files/' + item.path"
              >Download</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  computed: {
    ...mapGetters("auth", ["courseId"]),
  },

  mounted() {
      let data = {
          id:this.$route.params.id
      }
      this.getCourseId(data)
  },

  methods: {
    ...mapActions("auth", ["getCourseId"]),
  },
}
</script>

<style></style>
