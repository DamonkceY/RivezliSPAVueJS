<template>
  <div>
    <h4>Choose a group</h4>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Group Name</th>
        </tr>
      </thead>

      <tbody v-if="groups">
        <tr v-for="item in groups" :key="item.id">
          <th scope="row"></th>
          <td>
            <router-link :to="'group/' + item.group.id">
              {{ item.group.name }}
            </router-link>
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
    ...mapGetters("prof", ["groups"]),
  },
  mounted() {
    this.getProfGroups()
  },
  methods: {
    ...mapActions("prof", ["getProfGroups"]),
  },
}
</script>

<style></style>
