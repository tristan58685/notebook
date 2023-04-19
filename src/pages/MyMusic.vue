<template>
  <div class="box">
    <div class="banner"></div>
    <ul>
      <li
        @click="togo(musicItem)"
        class="libox"
        v-for="(musicItem, index) in musicList"
        :key="index"
        :class="musicItem.class"
      >
        <span class="imgbox">
          <img :src="musicItem.imgUrl" />
        </span>
        <span class="label">{{ musicItem.nickname }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// 数据放在musicdata的js文件里面引入进来，在data里面存一份（template里用到的数据都要在data里面拿取）
import musicList from "../components/ProMusic/MusicData.js";
export default {
  name: "MyDiary",
  components: {},
  data() {
    return {
      musicList,
    };
  },
  methods: {
    // 点击跳转到musicplay,携带id参数过去
    togo(musicItem) {
      this.$router.push({ name: "MusicPlay", query: { id: musicItem.id } });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  color: #fff;
  // background-color: rgb(250, 250, 250);
  .banner {
    width: 100%;
    height: 30px;
    // background-color: pink;
  }
  ul {
    //   display: flex;
    width: 1000px;
    height: 579px;
    // background-color: rgb(250, 250, 250);
    list-style: none;
    margin: 0 auto;
    color: gray;
  }
  li {
    /*  flex: 4;
  width: 220px; */
    display: float;
    float: left;
    width: 23%;
    height: 260px;
    // background: #fff;
    background-color: rgb(32, 33, 34);
    text-align: center;
    margin-left: 15px;
    margin-top: 15px;
    border-radius: 15px;
    cursor: pointer;
    // border: 1px solid rgb(204, 204, 204, 0.2);
    .imgbox {
      display: block;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
      margin: 20px auto 0;

      img {
        width: 100%;
        border-radius: 50%;
        transition: all ease-in 0.3s;
      }
    }
    .label {
      margin-top: 30px;
      display: block;
    }
  }
  .libox:hover {
    //   background-color: rgb(34, 47, 60);
    img {
      transform: scale(1.2);
    }
    color: #fff;
    &.class0 {
      background-color: rgb(34, 47, 60);
    }
    &.class1 {
      background-color: rgb(43, 137, 173);
    }
    &.class2 {
      background-color: rgb(24, 83, 119);
    }
    &.class3 {
      // background-color: rgb(240, 159, 154);
      background-color: pink;
    }
    &.class4 {
      background-color: rgb(150, 156, 187);
    }
    &.class5 {
      background-color: rgb(67, 133, 148);
    }
    &.class6 {
      // background-color: rgb(228, 86, 162);
      background-color: rgb(211, 81, 153);
    }
    &.class7 {
      background-color: rgb(31, 43, 58);
    }
  }
}
</style>