<template>
  <div>
    <div>
      <div class="row" v-if="this.profs">
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
            <tbody>
              <tr v-for="item in this.profs" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>
                  <button
                    style="margin-right: 5px;"
                    @click="edit(item)"
                    class="btn btn-primary"
                  >
                    Add Group
                  </button>
                  <button
                    id="open"
                    data-toggle="modal"
                    data-target="#EditModal"
                    style="display: none;"
                  ></button>
                  <button @click="details(item)" class="btn btn-info">
                    Details
                  </button>
                  <button
                    id="details"
                    data-toggle="modal"
                    data-target="#detailsModal"
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
            <h5 class="modal-title" id="exampleModalLabel">Add Professor</h5>
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
                <label for="exampleInputEmail1">Professor Name</label>
                <input
                  type="text"
                  required
                  v-model="data.name"
                  class="form-control"
                  id="exampleInputEmail1"
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

    <!-- Details Modal -->
    <div
      class="modal fade"
      id="detailsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Professor Details
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="selected">
            Professor name : {{ selected.name }}
            <br />
            Professor Email: {{ selected.email }}
            <br />
            Professor Groups:
            <div v-for="item in selected.groups" :key="item.id">
              {{ item.group.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Relation Modal -->
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
            <h5 class="modal-title" id="exampleModalLabel">Add Relation</h5>
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
            <form @submit.prevent="save">
              <div class="form-group">
                <label for="exampleInputEmail1">Select Group</label>
                <input
                  type="text"
                  :value="this.selected.name"
                  disabled
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Select Group</label>
                <select class="form-control" name="" ref="select">
                  <option v-for="i in this.groups" :key="i.id">
                    {{ i.name }}
                  </option>
                </select>
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
      data: {
        name: "",
      },
    }
  },
  mounted() {
    this.allGroups()
    this.allProfs()
  },
  computed: {
    ...mapGetters("admin", ["profs", "groups", "departments"]),
  },

  methods: {
    ...mapActions("admin", [
      "allProfs",
      "addRelation",
      "addProf",
      "allDepartment",
      "allGroups",
      "updateG",
      "deleteG",
      "addG",
    ]),

    save() {
      let details = {
        group_id: this.groups[this.$refs.select.selectedIndex].id,
        prof_id: this.selected.id,
      }

      this.addRelation(details)
      document.getElementById("closeEdit").click()
      this.$swal("Done", "", "success")
      this.selected = this.profs.filter((e) => e.id == this.selected.id)
      console.log(this.profs)
    },
    edit(item) {
      this.selected = item
      document.getElementById("open").click()
    },
    details(item) {
      this.selected = item
      document.getElementById("details").click()
    },
    add() {
      this.data.email = this.data.name.replace(/\s/g, "")
      this.data.email += "@mahdia.tn"
      //   console.log(this.data)
      this.addProf(this.data)
      document.getElementById("close").click()
      this.$swal("Done", "", "success")
    },
  },
}
</script>

<style></style>
