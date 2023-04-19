<template>
  <div>
    <img src="../../assets/lihuatong.png" alt="" class="lihuatong" />
  </div>
</template>
<script>
export default {
  methods: {
    run() {
      window.confetti({
        particleCount: 100, //粒子数量
        spread: 80, //扩散范围
        origin: {
          //喷出的位置
          x: 0.5,
          y: 0.65,
        },
      });
    },
  },
  mounted() {
    // 要操作的元素
    // 喷出五彩纸屑
    // 礼花筒绑定点击事件
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #000;
  /* 禁止选取 */
  user-select: none;
}
.lihuatong {
  width: 60px;
  position: absolute;
  left: 50%;
  top: 64%;
  transform: translateX(-50%);
  cursor: pointer;
}
</style>
