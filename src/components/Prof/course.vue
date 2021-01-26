<template>
  <div>
    <div>
      <form @submit.prevent="saveFile">
        <div class="form-group">
          <h3>Upload a file for Course : {{ CourseDetails.name }}</h3>
          <input
            type="text"
            class="form-control"
            placeholder="Enter A name for the file"
            v-model="details.name"
          />
        </div>
        <a @click="$refs.file.click()" class="btn btn-primary">
          Import a file <i class="fa fa-upload"></i>
        </a>
        <input
          style="display: none;"
          type="file"
          ref="file"
          @change="getFile"
        />

        <button style="float: right;" type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>

    <hr />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">File Name</th>
          <th scope="col">Path</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody v-if="CourseDetails">
        <tr v-for="item in CourseDetails.files" :key="item.id">
          <th scope="row"></th>
          <td>{{ item.name }}</td>
          <td>
            <a :href="'http://127.0.0.1:8000/storage/files/' + item.path"
              >Download</a
            >
          </td>
          <td>
            <button @click="del(item)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  data() {
    return {
      details: {
        name: "",
        file: null,
      },
    }
  },
  computed: {
    ...mapGetters("prof", ["CourseDetails"]),
  },

  mounted() {
    let data = { id: this.$route.params.id }
    this.getCourseDetails(data)
  },

  methods: {
    ...mapActions("prof", [
      "getCourseDetails",
      "addFileToCourse",
      "deleteFile",
    ]),
    saveFile() {
      if (this.details.name.length > 0) {
        let formData = new FormData()
        formData.append("name", this.details.name)
        if (this.details.file != null) {
          formData.append("file", this.details.file)
        }
        formData.append("course_id", this.$route.params.id)

        this.addFileToCourse(formData)

        this.details.name = ""
        this.details.url = ""
        this.details.file = null
      }
    },
    getFile() {
      this.details.file = this.$refs.file.files[0]
    },
    del(item) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // this.deleteDep(item)

            this.deleteFile(item)
            this.$swal.fire("Deleted!", "", "success")
          }
        })
    },
  },
}
</script>

<style></style>
