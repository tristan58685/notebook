<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHome from "./pages/MyHome.vue";
export default {
  name: "App",
  components: {
    MyHome,
  },
};
</script>

<style scoped>
</style>
