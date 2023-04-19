<template>
  <section>
    <div @click="togo()">
      <img src="../../assets/coconut.png" alt="" />
      <span>{{ functionname[0] }}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "FunctionFunction",
  props: {
    functionname: Array,
  },
  methods: {
    togo() {
      this.$router.push({
        name: this.functionname[1],
      });
    },
  },
};
</script>

<style scoped>
div {
  float: left;
  width: 15%;
  margin: 30px 3% 0 0;
  height: 200px;
  background-color: rgb(32, 33, 34);
  color: #fff;
  /* background-color: rgb(250, 249, 248);
  color: #333; */

  text-align: center;
  line-height: 200px;
  border: 1px solid #333;
  border-radius: 5px;
  transition: linear 0.1s;
  cursor: pointer;
}
div:hover {
  background-color: gray;
  /* transform: scale(0.8); */
  transform: translateY(-20px);
  /* transition: linear .1s; */
  /* box-shadow: 2px 2px 5px #fff; */
}
img {
  width: 30px;
  height: 30px;
  text-align: center;
  padding-top: 50px;
}
a {
  color: #fff;
}
</style>