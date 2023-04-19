<template>
  <div>
    <header>
      <CarouselCarousel :list="bannerList" />
    </header>
  </div>
</template>

<script>
import CarouselCarousel from "./CarouselCarousel.vue";
export default {
  name: "LunBotu",
  data() {
    return {
      bannerList: [],
    };
  },
  components: {
    CarouselCarousel,
  },
};
</script>

<style scoped>
header {
  /* float: left; */
  width: 70%;
  height: 350px;
  /* background-color: #fff; */
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
  /* background-color: #fff; */
  /* background-color: #ccc; */
}
</style>