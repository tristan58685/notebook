<template>
  <div class="big">
    <div class="days">
      <h3>
        距离考研倒计时还有<span>{{
          getDaysBetween("2023/12/24", nowTime)
        }}</span
        >天
      </h3>
    </div>
    <!-- ⭐原来日历位置 -->
    <div class="con" v-show="!ishover" style="border-radius: 0px">
      <div class="now-data-myself">
        <div class="now-data-myself-time">{{ date }}</div>
        <div class="now-data-myself-week">{{ week }}</div>
      </div>
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"
        v-on:isToday="clickToday"
      ></Calendar>
    </div>
    <div class="information" :class="{ new: ishover }">
      <i
        class="el-icon-s-promotion"
        :class="{ airplaneback: ishover }"
        @click="bigger"
      ></i>
      <div class="header">
        <span class="spanstyle">实用网址：</span>
        <el-button size="mini" @click="(isadd = true), (justadd = true)">
          添加网址
        </el-button>
        <el-dialog title="请输入名称和网址" :visible.sync="isadd" width="30%">
          <!-- :before-close="handleClose" -->
          <!-- <span>这是一段信息</span> -->
          <div class="demo-input-suffix" v-show="isadd">
            <el-input
              placeholder="请输入名称"
              suffix-icon="el-icon-postcard"
              v-model="input1"
              size="mini"
            >
            </el-input>
            <el-input
              placeholder="请输入地址"
              prefix-icon="el-icon-link"
              v-model="input2"
              size="mini"
            >
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isadd = false">取 消</el-button>
            <el-button type="primary" @click="addHttpLocation">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="center">
        <!-- <HttpLocation></HttpLocation> -->
        <p v-for="httplocation in httplocations" :key="httplocation.id">
          <a :href="httplocation.locations" target="blank">{{
            httplocation.nickname
          }}</a>
          <a @click="deleteLocation(httplocation)"
            ><i class="el-icon-delete"></i
          ></a>
          <a @click="editLocation(httplocation)"
            ><i class="el-icon-edit-outline"></i
          ></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/request";
import Calendar from "vue-calendar-component";
import { nanoid } from "nanoid";
export default {
  name: "SectionSection",
  components: {
    Calendar,
  },
  data() {
    return {
      date: "",
      week: "",
      ishover: false,
      nowTime: new Date().toLocaleDateString(),
      input1: "",
      input2: "",
      isadd: false, //添加网站
      isedit: false,
      value: new Date(), //element日历
      // addPlaceholder: "添加网站",
      key: String,
      httplocations: [],
      id: "",
      justadd: false, //用来分区添加网址和编辑网址，因为用的是一个确定方法
    };
  },

  created() {
    // 获取数据
    this.getHttpList();
    var now = new Date();
    this.date = now.getDate(); //得到日期
    var day = now.getDay(); //得到周几
    var arr_week = new Array(
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    );
    this.week = arr_week[day];
  },
  methods: {
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); // 跳到了本月
    },
    bigger() {
      this.ishover = !this.ishover;
    },
    getDaysBetween(dateString1, dateString2) {
      let startDate = Date.parse(dateString1);
      let endDate = Date.parse(dateString2);
      return (startDate - endDate) / (1 * 24 * 60 * 60 * 1000);
    },
    // ⭐⭐这里有个问题就是，add的数据会随机insert位置,不是push或unshift
    // 新增网址或者编辑网址在确定的时候都会触发addHttpLocation方法
    addHttpLocation() {
      // 加判断条件，如果this.justadd为true,说明是新增网址add，如果不是就是编辑网址update
      if (this.justadd) {
        // console.log(this.isadd);
        // 校验网址的正则
        // var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        let reg = /[http|https]:\/\/.*\.[com|cn|org|net|gov|edu|pub]/;
        let obj = {
          id: nanoid(),
          nickname: this.input1,
          locations: this.input2, //这个数组用来放小todolist们
        };
        if (!reg.test(obj.locations)) {
          this.$message('"请输入以http://或者 https://开头的正确网址！"');
          // return false;
        } else {
          console.log("调用addHttpList");
          // console.log(this.httplocations);
          this.addHttpList(obj);
          this.input1 = "";
          this.input2 = "";
          this.isadd = false;
          this.justadd = false;
        }
        // 如果不是的话，就是edit的确定，编辑网址
      } else {
        // 调用upHttpList
        console.log("just edit");
        console.log(this.id, this.input1, this.input2);
        this.upHttpList();
        this.getHttpList();
        this.isadd = false;
      }
    },
    // 删除网址
    deleteLocation(data) {
      console.log("删除网址");
      console.log(data);
      console.log(data.id);
      this.$confirm("此操作将永久删除该网址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delHttpList(data.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑网址
    editLocation(data) {
      this.isadd = true;
      // this.isedit = true;
      this.input1 = data.nickname;
      this.input2 = data.locations;
      this.id = data.id;
      console.log(this.input1, this.input2, this.id);
    },
    // 获取数据
    getHttpList() {
      axios.get("http://localhost/getHttpList").then((res) => {
        this.httplocations = res.data;
        console.log(res.data);
        console.log("成功");
      });
    },
    // 添加数据
    addHttpList(data) {
      //添加操作
      axios
        .post("http://localhost/addHttpList", {
          params: {
            id: data.id,
            locations: data.locations,
            nickname: data.nickname,
          },
        })
        .then((res) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          // 添加之后再去获取数据
          this.getHttpList();
        });
    },
    // 删除数据
    delHttpList(data) {
      //修改操作
      axios
        .post("http://localhost/delHttpList", {
          params: {
            id: data,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 删除之后再去获取数据
          this.getHttpList();
        });
    },
    // 更新数据
    upHttpList() {
      axios
        .post("http://localhost/upHttpList", {
          params: {
            id: this.id,
            locations: this.input2,
            nickname: this.input1,
          },
        })
        .then((res) => {
          // console.log(res.data);
          console.log("更改成功");
          // 更新之后再去获取数据
          this.getHttpList();
        });
    },
  },
};
</script>

<style  lang="less" >
.big {
  position: absolute;
  right: 28px;
  top: 2px;
  width: 315px;
  height: 580px;
  color: #fff;
  background-color: rgb(32, 33, 34);
  border: 1px solid #333;
  border-radius: 5px;
  // 解决盒子抖动的问题
  overflow: hidden;
}
.now-data-myself {
  width: 40%;
  position: absolute;
  border-right: 1px solid rgba(227, 227, 227, 0.6);
}
.con {
  position: absolute;
  max-width: 280px;
  overflow: hidden;
  /* border-radius: 4px; */
  margin-top: 6px;
  /* box-shadow: 8px 6px 12px green; */
  /* width: 280px; */
  /* height: 280px; */
  /* margin: 20px 0 0 20px; */
  // margin-right: 8px;
  margin-left: 15px;
  background-color: #f5f5f5;
  /* background-color: black; */
  /* .calendar {
    width: 280px;
    height: 280px;
  } */
}
// 日历样式
.wh_container {
  width: 280px;
  height: 280px;
}
.con .wh_content_all {
  background: transparent !important;
}
.wh_top_changge li {
  color: #f56c6c !important;
  font-size: 15px !important;
}
.wh_content_item,
.wh_content_item_tag {
  color: #303133 !important;
}
.wh_content_item .wh_isToday {
  background: #00d985 !important;
  color: #fff !important;
}
.wh_content_item .wh_chose_day {
  background: #409eff !important;
  color: #fff !important;
}
.wh_item_date:hover {
  background: rgb(217, 236, 255) !important;
  border-radius: 100px !important;
  color: rgb(102, 177, 255) !important;
}
.wh_jiantou1[data-v-2ebcbc83] {
  border-top: 2px solid #909399;
  border-left: 2px solid #909399;
  width: 7px;
  height: 7px;
}
.wh_jiantou2[data-v-2ebcbc83] {
  border-top: 2px solid #909399;
  border-right: 2px solid #909399;
  width: 7px;
  height: 7px;
}
.wh_top_tag[data-v-2ebcbc83] {
  color: #409eff;
  border-top: 1px solid rgba(227, 227, 227, 0.6);
  border-bottom: 1px solid rgba(227, 227, 227, 0.6);
}
.wh_container[data-v-2ebcbc83] {
  max-width: 280px;
}
.wh_top_changge[data-v-2ebcbc83] {
  display: flex;
  width: 50%;
  margin-left: 43%;
}
.now-data-myself-time {
  color: #f56c6c;
  font-size: 28px;
  height: 30px;
  font-family: "Helvetica Neue";
  text-align: center;
}
.now-data-myself-week {
  font-size: 10px;
  color: #909399;
  text-align: center;
}
.wh_top_changge .wh_content_li[data-v-2ebcbc83] {
  font-family: Helvetica;
}

.days {
  padding: 0 16px;
}
.days h3 span {
  color: violet;
  // color: #00bbff;
  font-size: 30px;
}

.information {
  position: relative;
  width: 100%;
  /* height: 278px; */
  height: 255px;
  margin-top: 300px;
  border: 1px solid rgba(227, 227, 227, 0.3);
  overflow: hidden;
  transition: linear 0.2s;
  // overflow: auto;
  // overflow-x: hidden;
  &.new {
    margin-top: 0;
    height: 100%;
  }
  //飞机
  .el-icon-s-promotion {
    position: absolute;
    top: 3px;
    right: 3px;
  }
  .airplaneback {
    transform: rotate(180deg);
  }
}
.header {
  margin: 4px 0 5px 0;
  padding: 0 16px;
  /* border-bottom: 1px solid rgba(227, 227, 227, 0.3); */
  .spanstyle {
    font-weight: 700;
    font-size: 18px;
  }
}
.center {
  padding: 0 16px;
}
// 删除，编辑小图标
.el-icon-delete {
  float: right;
}
.el-icon-edit-outline {
  float: right;
  margin-right: 5px;
}
.center a {
  text-decoration: none;
  color: rgb(238, 130, 238);
  // 待修改样式
  /*  background: -webkit-linear-gradient(315deg, violet 25%, #647eff);
  color: #fff; */
}
.center a:hover {
  color: #fff;
}
.center p {
  margin-bottom: 6px;
}
.center span {
  margin-right: 8px;
}

//弹出消息框样式
.el-dialog__body {
  padding: 10px 20px !important;
}
.el-input__inner {
  margin-bottom: 10px !important;
}
</style>