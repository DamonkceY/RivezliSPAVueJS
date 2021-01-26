<template>
  <div ref="cont">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>
                <button
                  data-toggle="modal"
                  data-target="#exampleModal"
                  class="btn btn-info btn-block"
                >
                  Add
                </button>
              </th>
              <th>
                name
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody v-if="departments">
            <tr v-for="item in this.departments" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <button
                  style="margin-right: 5px;"
                  @click="edit(item)"
                  class="btn btn-primary"
                >
                  edit
                </button>
                <button
                  id="open"
                  data-toggle="modal"
                  data-target="#EditModal"
                  style="display: none;"
                ></button>
                <button @click="del(item)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add Modal -->
    <div
      ref="modalAdd"
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Department</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="add">
              <div class="form-group">
                <label for="exampleInputEmail1">Department Name</label>
                <input
                  type="text"
                  required
                  v-model="name"
                  class="form-control"
                  placeholder="Enter name"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  id="close"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="selectedDep"
      class="modal fade"
      id="EditModal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Department</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveEdit">
              <div class="form-group">
                <label for="exampleInputEmail1">Department Name</label>
                <input
                  type="text"
                  required
                  v-model="name"
                  class="form-control"
                  placeholder="Enter name"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  id="closeEdit"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      name: null,
      selectedDep: null,
    }
  },
  components: {},
  mounted() {
    this.allDepartment()
  },
  computed: {
    ...mapGetters("admin", ["departments"]),
  },

  methods: {
    ...mapActions("admin", [
      "allDepartment",
      "updateDep",
      "deleteDep",
      "addDep",
    ]),


    add() {
      this.addDep(this.name)
      document.getElementById("close").click()
      this.$swal("Done", "", "success")
    },
    saveEdit() {
      this.selectedDep.name = this.name
      this.updateDep(this.selectedDep)
      document.getElementById("closeEdit").click()
      this.$swal("Done", "", "success")
    },
    edit(item) {
      this.selectedDep = item
      this.name = item.name
      document.getElementById("open").click()
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
            console.log(item)
            this.deleteDep(item)
            this.$swal.fire("Deleted!", "", "success")
          }
        })
    },
  },
}
</script>

<style></style>
