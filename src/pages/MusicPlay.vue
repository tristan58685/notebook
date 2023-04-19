<template>
  <div class="box" :class="item.class">
    <div class="left" @click="playing">
      <div class="play" :class="playStatus ? 'going' : 'pause'"></div>
      <!-- <img src="../assets/huanhai.jpg" alt="" /> -->
      <img
        :src="item.imgUrl"
        :class="playStatus ? 'rotating' : 'rotating-pause'"
      />
    </div>
    <div class="right">
      <h2>{{ item.nickname }}</h2>
      <p>
        {{ item.paragraph }}
      </p>
      <span>{{ item.author }}</span>
    </div>
    <!-- ⭐动态歌词？ -->
  </div>
</template>

<script>
import musicList from "../components/ProMusic/MusicData.js";
export default {
  name: "MusicPlay",
  data() {
    return {
      musicList,
      item: {},
      playStatus: false,
      music: null,
    };
  },
  methods: {
    playing() {
      // console.log(this.playStatus);
      if (!this.playStatus) {
        this.music.play();
        this.playStatus = true;
      } else {
        this.music.pause();
        this.playStatus = false;
      }
      // music.loop = true;
      // music.playbackRate = 2;
    },
  },
  created() {
    let index = this.musicList.findIndex((v) => v.id === this.$route.query.id);
    this.item = this.musicList[index];
    this.music = new Audio();
    this.music.src = this.item.musicUrl;
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 609px;
  color: #fff;
  position: relative;
  // background-color: black;

  .left {
    width: 260px;
    height: 260px;
    position: absolute;
    top: 140px;
    left: 200px;
    border-radius: 50%;
    overflow: hidden;
    &:hover {
      .play {
        opacity: 0.8;
      }
    }
    .play {
      position: absolute;
      width: 64px;
      height: 64px;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      background-size: cover;
      // background-color: #fff;
      opacity: 0.5;
      // transition: all linear 0.2s;
      // background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjYwOCAxNC4xMmwtOC43ODMgNS40OUEyLjUgMi41IDAgMCAxIDUgMTcuNDlWNi41MWEyLjUgMi41IDAgMCAxIDMuODI1LTIuMTJsOC43ODMgNS40OWEyLjUgMi41IDAgMCAxIDAgNC4yNHoiLz4KPC9zdmc+Cg==);
      // background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiA2KSI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMTIiIHJ4PSIxIi8+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMTIiIHg9IjgiIHJ4PSIxIi8+CiAgICA8L2c+Cjwvc3ZnPgo=);
    }
    img {
      width: 100%;
      height: 100%;
    }
    @keyframes rotating {
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .right {
    width: 460px;
    height: 260px;
    position: absolute;
    top: 140px;
    left: 550px;
    // border: 1px solid #ccc;
    background-color: transparent;
    h2 {
      font-size: 38px;
      font-weight: 400;
      margin-top: 20px;
      // color: #fff;
    }
    p {
      margin-top: 56px;
      font-size: 15px;
      color: skyblue;
    }
    span {
      display: block;
      font-size: 12px;
      margin-top: 40px;
      // color: #fff;
    }
    // background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjYwOCAxNC4xMmwtOC43ODMgNS40OUEyLjUgMi41IDAgMCAxIDUgMTcuNDlWNi41MWEyLjUgMi41IDAgMCAxIDMuODI1LTIuMTJsOC43ODMgNS40OWEyLjUgMi41IDAgMCAxIDAgNC4yNHoiLz4KPC9zdmc+Cg==);
  }
}
.class0 {
  background-color: rgb(34, 47, 60);
}
.class1 {
  background-color: rgb(43, 137, 173);
}
.class2 {
  background-color: rgb(24, 83, 119);
}
.class3 {
  // background-color: rgb(240, 159, 154);
  background-color: pink;
}
.class4 {
  background-color: rgb(150, 156, 187);
}
.class5 {
  background-color: rgb(67, 133, 148);
}
.class6 {
  background-color: rgb(211, 81, 153);
}
.class7 {
  background-color: rgb(31, 43, 58);
}
// 播放器暂停和继续样式
.going {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiA2KSI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMTIiIHJ4PSIxIi8+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMTIiIHg9IjgiIHJ4PSIxIi8+CiAgICA8L2c+Cjwvc3ZnPgo=);
  z-index: 10;
}
.pause {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjYwOCAxNC4xMmwtOC43ODMgNS40OUEyLjUgMi41IDAgMCAxIDUgMTcuNDlWNi41MWEyLjUgMi41IDAgMCAxIDMuODI1LTIuMTJsOC43ODMgNS40OWEyLjUgMi41IDAgMCAxIDAgNC4yNHoiLz4KPC9zdmc+Cg==);
  z-index: 10;
}
.rotating {
  animation: rotating 10s linear infinite;
}
.rotating-pause {
  animation: rotating 10s linear infinite;
  animation-play-state: paused;
}
</style>