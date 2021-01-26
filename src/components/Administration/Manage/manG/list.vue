<template>
  <div>
    <div>
      <div class="row" v-if="this.groups">
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
                  department
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in this.groups" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.department.name }}</td>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
            <h5 class="modal-title" id="exampleModalLabel">Add Group</h5>
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
                <label for="exampleInputEmail1">Group Name</label>
                <input
                  type="text"
                  required
                  v-model="name"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter name"
                />
              </div>
              <div class="form-group">
                <label>Select department</label>
                <select ref="select" class="form-control" name="select">
                  <option v-for="i in departments" :key="i.id" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
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
      v-if="selected"
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
                <label for="exampleInputEmail1">Group Name</label>
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
      selected: null,
      name: null,
    }
  },
  mounted() {
    this.allGroups()
    this.allDepartment()
  },
  computed: {
    ...mapGetters("admin", ["groups", "departments"]),
  },

  methods: {
    ...mapActions("admin", [
      "allDepartment",
      "allGroups",
      "updateG",
      "deleteG",
      "addG",
    ]),

    saveEdit() {
      this.selected.group_name = this.name
      this.selected.department_id = this.selected.department.id
      this.updateG(this.selected)
      this.groups[this.groups.findIndex(e => e.id == this.selected.id)].name = this.selected.group_name
      document.getElementById("closeEdit").click()
      this.$swal("Done", "", "success")
    },
    edit(item) {
      this.selected = item
      this.name = item.name
      document.getElementById("open").click()
    },
    add() {
      let data = {
        group_name: this.name,
        department_id: this.departments[this.$refs.select.selectedIndex].id,
      }
      this.addG(data)
      document.getElementById("close").click()
      this.$swal("Done", "", "success")
    },
  },
}
</script>

<style></style>
