<template>
  <div>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Course Name</th>
          <th scope="col">Teacher Name</th>
        </tr>
      </thead>

      <tbody v-if="mycourses">
        <tr v-for="item in mycourses" :key="item.id">
          <th scope="row"></th>
          <td><router-link :to="'courses/'+item.id">{{item.name}}</router-link></td>
          <td>
            {{ item.user.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {

    computed: {
        ...mapGetters("auth",["mycourses"])
    },

    mounted(){
        this.getMyCourses()
    },
    methods:{
        ...mapActions("auth",["getMyCourses"])
    }

}
</script>

<style>

</style>