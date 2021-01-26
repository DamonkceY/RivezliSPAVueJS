<template>
  <div>
    <form @submit.prevent="add">
      <div class="form-group">
        <h3>Create new Course</h3>
        <input
          type="text"
          v-model="details.name"
          class="form-control"
          placeholder="Enter course name"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <hr />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Course Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody v-if="courses">
        <tr v-for="item in courses" :key="item.id">
          <th scope="row"></th>
          <td>
            <router-link :to="'/course/' + item.id">{{
              item.name
            }}</router-link>
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
      details: {},
    }
  },

  mounted() {
    let data = { id: this.$route.params.id }
    this.getAllCoursesGroup(data)
  },

  computed: {
    ...mapGetters("prof", ["courses"]),
  },

  methods: {
    ...mapActions("prof", ["addCourse", "getAllCoursesGroup", "deleteCourse"]),
    add() {
      // qsdqsdqsd
      this.details.group_id = 2
      this.addCourse(this.details)
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

            this.deleteCourse(item)
            this.$swal.fire("Deleted!", "", "success")
          }
        })
    },
  },
}
</script>

<style></style>
