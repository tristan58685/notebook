<template>
  <div>
    <LunBotu />
    <FunctionFunction :functionname="first" />
    <FunctionFunction :functionname="second" />
    <FunctionFunction :functionname="third" />
    <FunctionFunction :functionname="fourth" />
    <SectionSection />
  </div>
</template>

<script>
import LunBotu from "../components/ProHome/LunBotu.vue";
import FunctionFunction from "../components/ProHome/FunctionFunction.vue";
import SectionSection from "../components/ProHome/ProSection/SectionSection.vue";
import "@/style/common.css";

export default {
  name: "MyHome",
  components: {
    LunBotu,
    FunctionFunction,
    SectionSection,
  },

  data() {
    return {
      first: ["笔记", "note"],
      second: ["轻音乐", "music"],
      third: ["todolist", "todolist"],
      fourth: ["倒计时", "countdown"],
    };
  },

  created() {
    localStorage.getItem("noteList") ||
      localStorage.setItem("noteList", JSON.stringify([]));
    localStorage.getItem("musiclist") ||
      localStorage.setItem("musiclist", JSON.stringify([]));
    localStorage.getItem("todolist") ||
      localStorage.setItem("todolist", JSON.stringify([]));
    localStorage.getItem("countdownlist") ||
      localStorage.setItem("countdownlist", JSON.stringify([]));
    // 实用网址
    localStorage.getItem("httplist") ||
      localStorage.setItem("httplist", JSON.stringify([]));
  },
};
</script>

<style scoped>
</style>
