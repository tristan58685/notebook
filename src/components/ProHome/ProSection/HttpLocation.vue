<template>
  <div class="allhttps">
    <!-- v-for循环时,key属性只能用number或者string类型。 -->
    <p v-for="httplocation in httplocations" :key="httplocation.nickname">
      <!-- <span>{{ httplocation.nickname }}</span>
      <a :href="httplocation.locations" target="blank">点击跳转</a> -->
      <a :href="httplocation.locations" target="blank">{{
        httplocation.nickname
      }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "HttpLocation",
  data() {
    return {
      key: String,
      httplocations: [
        {
          nickname: " 百度",
          locations: "https://www.baidu.com.cn/",
          id: "1",
        },
        {
          nickname: "中国研究生招生信息网",
          locations: "https://yz.chsi.com.cn/",
          id: "2",
        },
        {
          nickname: "国家政务平台网",
          locations: "https://www.gov.cn/",
          id: "3",
        },
        {
          nickname: "bilibili",
          locations: "https://www.bilibili.com/",
          id: "4",
        },
        {
          nickname: "百度网盘",
          locations: "https://pan.baidu.com/",
          id: "5",
        },
        {
          nickname: "安阳师范学院",
          locations: "http://www.aynu.edu.cn/",
          id: "6",
        },
        {
          nickname: "中国大学MOOC",
          locations: "https://www.icourse163.org/",
          id: "7",
        },
        {
          nickname: "TED",
          locations: "https://www.ted.com/",
          id: "8",
        },
        {
          nickname: "中国知网",
          locations: "https://www.cnki.net/",
          id: "9",
        },
        {
          nickname: "GitHub",
          locations: "https://github.com/",
          id: "10",
        },
        {
          nickname: "学习通",
          locations:
            "http://passport2.chaoxing.com/login?newversion=true&refer=http%3A%2F%2Fpay.chaoxing.com%2Findex.aspx",
          id: "11",
        },
        {
          nickname: "腾讯邮箱",
          locations: " https://wx.mail.qq.com/",
          id: "12",
        },
        {
          nickname: "中国教育考试网222",
          locations: "https://zscx.neea.edu.cn/",
          id: "13",
        },
      ],
    };
  },
  created() {
    console.log(11111);
    this.get();
  },
  methods: {
    get() {
      axios
        .get("http://127.0.0.1/getHttplist")
        .then((res) => {
          console.log(res.data);
          console.log("成功");
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
    },
  },
};
</script>

<style>
</style>