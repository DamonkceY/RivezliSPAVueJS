<template>
  <div id="app">
    <Navbar />
    <br><br><br>
    <router-view name="HomeView"></router-view>
    <!-- <Footer /> -->
  </div>
</template>

<script>
// import Footer from "./components/Layout/Footer.vue";
import Navbar from './components/Layout/Navbar.vue';
export default {
  components: {Navbar},
  
};
</script>
<style>

</style>
