<template>
  <div class="box">
    <div
      id="container"
      :class="{
        light: status === false,
        dark: status == true,
      }"
    >
      <!-- <div
      class="dark"
      id="container"
    > -->
      <div class="bg"></div>
      <div class="moon-box">
        <div class="moon"></div>
      </div>
      <div class="sun-box">
        <div class="sun"></div>
      </div>
      <div class="sea"></div>
      <!-- 倒计时 -->
      <div class="countdown-box" v-show="!status">
        <FlipCountdown
          class="countdown-style"
          :showDays="false"
          :deadline="countdownValue"
          @timeElapsed="timeout"
        ></FlipCountdown>
      </div>
      <!-- 开关 -->
      <!-- 初始值为true,展示时钟 -->
      <div class="switch">
        <el-switch
          style="display: block"
          v-model="status"
          active-color="#0b6262"
          inactive-color="#b67d13"
          active-text="时钟"
          inactive-text="计时"
          @change="statusChange"
        >
        </el-switch>
        <el-button
          size="mini"
          type="warning"
          style="margin-top: 10px"
          v-if="!status && hasSetCountDown"
          @click="resetTime"
          >更改计时时长</el-button
        >
        <!-- 时间选择 -->
        <el-time-picker
          class="time-picker"
          v-show="!status && showChooseTime"
          @change="timeChange"
          v-model="value1"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:59',
          }"
          placeholder="任意时间点"
          format="HH:mm:ss"
        >
        </el-time-picker>
      </div>
    </div>
    <!-- 当前时间显示 -->
    <!-- status初始值为true -->
    <div class="clock" v-show="status">
      <span>{{ hours }}</span>
      <span>{{ minutes }}</span>
      <span>{{ seconds }}</span>
    </div>
  </div>
</template>
 

<script>
import FlipCountdown from "vue2-flip-countdown";
export default {
  name: "MyCountDown",
  components: { FlipCountdown },
  data() {
    return {
      status: true, //背景切换,刚开始的时候显示时钟
      hours: "",
      minutes: "",
      seconds: "",
      countdownValue: "2023-04-09 00:00:00", //倒计时给的时间
      value1: "2023-01-01 03:00:00", //倒计时默认值为3小时
      hasSetCountDown: false,
      showChooseTime: true,
    };
  },
  created() {
    // 开启定时器，一秒钟调用一次，防止有空白渲染问题，首先调用一次
    // 如果localstorage里面有数据，就拿出
    this.getCountdownlist();

    // let countdownlist = JSON.parse(localStorage.getItem("countdownlist"));
    /* if (
      countdownlist &&
      new Date(countdownlist).getTime() > new Date().getTime()
    ) {
      this.countdownValue = countdownlist;
      this.hasSetCountDown = true;
      this.showChooseTime = false;
      this.status = false;
      console.log("localstorage里有数据,赋值为countdownValue");
    } else {
      this.hasSetCountDown = false;
      this.showChooseTime = true;
      this.status = true;
    }
    this.getTime();
    setInterval(this.getTime, 1000); */
  },
  methods: {
    // 重新选择倒计时后，showChooseTime为true,time-picker展示
    resetTime() {
      this.showChooseTime = true;
    },
    /*  选择倒计时后，把现在的时间加上选择的倒计时时长时间戳相加，换算到预计的时间，传给timers处理成时分秒
    status为false,切换到计时， 并且hasSetCountDown属性为true（第一次）,showChooseTime为false即不展示
    选择倒计时后，time-picker的绑定值设置为000，这样下一次reset倒计时时，才能检测到是change*/
    timeChange(value) {
      // value拿到的是标准时间，转换成毫秒，1秒是1000毫秒，1分钟是60*1000毫秒，1小时是60*60*1000毫秒
      let hours = Number(value.getHours() * 3600000);
      let minutes = Number(value.getMinutes() * 60000);
      let seconds = Number(value.getSeconds() * 1000);
      // ⭐调用timers方法，当前时间戳加上倒计时时长的时间戳，获取时分秒
      this.countdownValue = this.timers(
        new Date(new Date().getTime() + hours + minutes + seconds)
      );
      this.status = false;
      this.hasSetCountDown = true;
      this.showChooseTime = false;
      this.value1 = "2023-01-01 00:00:00";
      // 选择倒计时时长之后，就存储到localstorage里面
      localStorage.setItem(
        "countdownlist",
        JSON.stringify(this.countdownValue)
      );
    },
    // 开关状态更改
    statusChange() {
      /* value2初始值为true(时钟)，如果开关在时钟一侧，status就是ture,即显示时钟，
      （如果切换后在计时一侧，并且已经设置过了倒计时，status就是false,显示倒计时 */
      // if (this.value2) {
      //   this.status = true;
      // } else {
      //   this.status = false;
      // }
    },
    // 拿到时间戳，返还00：00：00时分秒格式
    timers(timer) {
      let year = timer.getFullYear();
      let month = timer.getMonth() + 1; //转换成月 ，月注意要加1
      let day = timer.getDate();
      let hours = timer.getHours();
      let minutes = timer.getMinutes();
      let secend = timer.getSeconds();
      let str = `${year}-${month}-${day} ${hours}:${minutes}:${secend}`;
      return str;
    },
    // 时钟
    getTime() {
      let time = new Date();
      this.hours = time.getHours();
      this.minutes = time.getMinutes();
      this.seconds = time.getSeconds();
      if (this.hours < 10) {
        this.hours = "0" + this.hours;
      }
      if (this.minutes < 10) {
        this.minutes = "0" + this.minutes;
      }
      if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
      }
    },
    timeout() {
      // alert("计时结束");
      console.log("计时结束");
      this.$message({
        message: "计时结束",
        type: "success",
      });
      this.hasSetCountDown = false;
      this.showChooseTime = true;
    },
    getCountdownlist() {
      this.$axios
        .get("http://localhost/getCountdownlist")
        .then((res) => {
          // 这里写获取数据
          // let countdownlist = JSON.parse(localStorage.getItem("countdownlist"));
          this.countdownlist = res.data;
          console.log(res.data);
          console.log("成功");

          if (
            countdownlist &&
            new Date(countdownlist).getTime() > new Date().getTime()
          ) {
            this.countdownValue = countdownlist;
            this.hasSetCountDown = true;
            this.showChooseTime = false;
            this.status = false;
            console.log("localstorage里有数据,赋值为countdownValue");
          } else {
            this.hasSetCountDown = false;
            this.showChooseTime = true;
            this.status = true;
          }
          this.getTime();
          setInterval(this.getTime, 1000);
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
    },
  },
};
</script>
 
<style lang="less" scoped>
body {
  /* 初始化 取消内外边距 */
  margin: 0;
  padding: 0;
}
#container {
  /* 100%窗口高度 */
  height: 100vh;
}
.bg {
  /* 绝对定位 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.sun {
  margin: 0;
  padding: 0;
  /* 绝对定位 水平垂直居中 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background-color: orange;
  border-radius: 50%;
}
.moon {
  margin: 0;
  padding: 0;
  /* 绝对定位 水平垂直居中 */
  position: absolute;
  top: 50%;
  left: 50%;
  /* 计算得出月亮的位置 */
  transform: translate(calc(-50% + -160px), calc(-50% + -180px));
  width: 600px;
  height: 600px;
  /* 通过阴影绘制月亮 */
  box-shadow: 160px 180px 0 cyan;
  border-radius: 50%;
}
.sea {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35%;
  /* 背景模糊制造大海的感觉 */
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  z-index: 100;
}
.sun,
.moon,
.sun-box,
.moon-box,
.bg {
  /* 添加动画过渡 */
  transition: all 1s ease-in-out;
}
.sun-box,
.moon-box {
  /* 相对定位 */
  position: relative;
  /* 溢出隐藏 */
  overflow: hidden;
}
/* 白天 */
.light .sun-box {
  height: 100%;
}
.light .moon-box {
  height: 0;
}
.light .bg {
  background-color: #ffeea2;
}
/* 夜晚 */
.dark .sun-box {
  height: 0;
}
.dark .moon-box {
  height: 100%;
}
.dark .bg {
  background-color: #040720;
}
/* 切换按钮样式 */
.btn-box {
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 101;
  display: flex;
  flex-direction: row;
}
.btn-box div {
  background: rgba(255, 255, 255, 0.7);
  color: #000;
  width: 90px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-box div:hover {
  background: #fff;
}
.clock {
  position: absolute;
  display: flex;
  top: 96px;
  // top: 10px;
  z-index: 110;
  width: 1000px;
  height: 300px;
  transform: translate(-50%);
  left: 50%;
  span {
    height: 300px;
    width: 33.3%;
    background-color: rgba(204, 204, 204, 0.4);
    // background-color: rgba(204, 204, 204);
    margin-right: 8px;
    line-height: 300px;
    text-align: center;
    font-size: 200px;
    font-weight: 700;
    color: gray;
    // color: #fff;
  }
}
// 倒计时盒子
.countdown-box {
  position: absolute;
  top: 96px;
  width: 1000px;
  height: 300px;
  z-index: 10;
  transform: translate(-50%);
  left: 50%;
  // background-color: pink;
}
//开关
.switch {
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 130px;
  height: 30px;
  z-index: 110;
  // background-color: pink;
}
.time-picker {
  position: relative;
  left: -44px;
  margin-top: 10px;
}
</style>

<style lang="less">
/* .countdown-style {
  background-color: pink;
  .flip-card__top,
  .flip-card__bottom {
    background-color: #fff !important;
  }
} */
// 开关字体颜色
/deep/.el-switch__label {
  color: rgb(128, 128, 128, 0.3) !important;
}
@halfHeight: 0.72em;
// ⭐用到height
.flip-card__top,
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__back::before,
.flip-card__back::after {
  // background: violet !important; //上半部分背景
  background-color: rgba(204, 204, 204) !important;
  // width: 2.1em !important;
  width: 1.5em !important;
  //  height: @halfHeight;
}
// ⭐用到height
/* .flip-card__top-4digits,
.flip-card__bottom-4digits,
.flip-card__back-bottom-4digits,
.flip-card__back-4digits::before,
.flip-card__back-4digits::after {
  // background: skyblue !important;
  // height: 2.1em !important;
  height: @halfHeight;
} */
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__bottom-4digits,
.flip-card__back-bottom-4digits {
  // background: pink !important;
  background-color: rgba(204, 204, 204) !important;
  // height: 2.1em !important;
}

// ⭐用到height
.flip-card__bottom::after,
.flip-card__back-bottom::after,
.flip-card__bottom-4digits::after,
.flip-card__back-bottom-4digits::after {
  display: block;
  margin-top: -@halfHeight;
}
.flip-clock__slot {
  display: none !important;
}
.flip-card[data-v-b6b5360c] {
  font-size: 13rem !important;
}
</style>