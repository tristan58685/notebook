<template>
  <div class="box">
    <div class="header">
      <span>Todolist</span>
    </div>
    <div class="todo-container">
      <div class="leftSection">
        <div class="fav-notice">
          <div
            :class="{ active: chooseType === 'fav' }"
            class="fav-list"
            @click="chooseFavOrNotice('fav')"
          >
            <span>
              <i class="el-icon-star-on" style="font-size: 16px"></i>
              重要
            </span>
            <span>{{ favList.length }}</span>
          </div>
          <div
            :class="{ active: chooseType === 'notice' }"
            class="notice-list"
            @click="chooseFavOrNotice('notice')"
          >
            <span>
              <i class="el-icon-bell" style="margin: 0 1px"></i>
              计划提醒
            </span>
            <span>{{ noticeList.length }}</span>
          </div>
        </div>
        <el-divider></el-divider>
        <div>
          <div class="buttonStyle">
            <i class="el-icon-edit"></i>
            <!-- 这里@blur="submitList"有些问题，在打开开发者工具的时候也会显示 -->
            <input
              type="text"
              placeholder="新建列表"
              v-model="name"
              @keyup.enter="submitList"
            />
          </div>
          <ul>
            <!-- 这里要考虑到删除和选中列表的问题，点击删除的时候，会不会触发选中的方法 -->
            <li
              v-for="item in List"
              :key="item.id"
              @click="chooseItem(item)"
              :class="{
                currentStyle: item.id === currentItem.id,
              }"
            >
              <div>
                <i class="el-icon-folder-opened"></i>
                {{ item.listName }}
              </div>
              <div>
                <el-button
                  circle
                  icon="el-icon-delete"
                  @click="deleteItem(item.id)"
                ></el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="rightSection">
        <div class="add">
          <span
            ><i class="el-icon-folder-opened"></i
            >{{ currentItem.listName }}</span
          >
          <el-input
            :disabled="!currentItem.id"
            placeholder="添加任务"
            style="width: 450px; margin: 10px 20px"
            prefix-icon="el-icon-plus"
            v-model="todoName"
            @change="submitData"
          >
          </el-input>
        </div>
        <div class="doing" v-if="currentItem.id">
          正在进行<span>{{
            currentItem.todoItemList.filter((v) => !v.todoStatus).length
          }}</span>
        </div>
        <!-- <li v-for="todoItem in currentItem.todoItemList" :key="todoItem.id"> -->
        <!-- v-for和filter不建议一起使用，否则会渲染很多遍 -->
        <ul>
          <li v-for="todoItem in filterTodoData" :key="todoItem.id">
            <div>
              <el-checkbox
                v-model="todoItem.todoStatus"
                @change="changed"
              ></el-checkbox>
              {{ todoItem.todoName }}
            </div>
            <div>
              <el-popover
                trigger="manual"
                placement="left"
                v-model="todoItem.showBell"
              >
                <div>
                  <div>
                    <div style="margin-bottom: 10px">
                      <label> 提醒开关： </label>
                      <el-switch
                        v-model="todoItem.popNoticeStatus"
                        active-color="#13ce66"
                      >
                      </el-switch>
                    </div>
                    <el-date-picker
                      v-model="todoItem.popTime"
                      @change="todoItem.popNoticeStatus = true"
                      type="datetime"
                      value-format="timestamp"
                      placeholder="选择日期时间"
                    >
                    </el-date-picker>
                  </div>
                  <div style="text-align: right; margin-top: 10px">
                    <el-button @click="todoItem.showBell = false" size="mini"
                      >取消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="confirmNotice(todoItem)"
                      size="mini"
                      >确定</el-button
                    >
                  </div>
                </div>
                <el-button
                  circle
                  @click="showNotice(todoItem)"
                  :icon="
                    !todoItem.noticeStatus
                      ? 'el-icon-bell'
                      : 'el-icon-message-solid'
                  "
                  :class="{ 'notice-bell': todoItem.noticeStatus }"
                  slot="reference"
                ></el-button>
              </el-popover>
              <el-button
                v-show="todoItem.favStatus"
                circle
                style="color: #409eff; font-size: 16px; padding: 6px"
                icon="el-icon-star-on"
                @click="setFav(todoItem, false)"
              ></el-button>
              <el-button
                v-show="!todoItem.favStatus"
                circle
                icon="el-icon-star-off"
                @click="setFav(todoItem, true)"
              ></el-button>
              <el-button
                circle
                icon="el-icon-delete"
                @click="deleteTodoItem(todoItem)"
              ></el-button>
            </div>
          </li>
        </ul>
        <div class="done" v-if="currentItem.id">
          已经完成<span>{{
            currentItem.todoItemList.filter((v) => v.todoStatus).length
          }}</span>
        </div>
        <ul v-if="currentItem.id">
          <li
            v-for="todoItem in filterDoneData"
            :key="todoItem.id"
            :class="{
              deleteStyle: todoItem.todoStatus === true,
            }"
          >
            <!-- 状态更改通过v-model去完成，change方法在localstorage里面更新 -->
            <div>
              <el-checkbox
                v-model="todoItem.todoStatus"
                @change="changed"
              ></el-checkbox>
              {{ todoItem.todoName }}
            </div>
            <div>
              <el-button
                circle
                icon="el-icon-delete"
                @click="deleteTodoItem(todoItem)"
              ></el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 烟花 -->

    <Fireworks v-show="showFire" ref="fireworks" />
  </div>
</template>

<script>
/* 存放localstorage里的时机：
1创建item回车2.删除item方法3.创建todoitem回车4.删除todoitem方法5.更改todoStatus状态 */
// ⭐优化点（最后一个item删除的时候，显示有问题，类似延迟问题
import { nanoid } from "nanoid";
import Fireworks from "../components/Fireworks";

export default {
  name: "MyTodolist",
  components: { Fireworks },

  data() {
    return {
      List: [],
      name: "", //列表名称
      // currentId: "", //当前id
      // currenNme:'',//当前选中的name
      currentItem: { todoItemList: [] }, //当前item
      todoName: "", //生成的小todo的name
      // todoStatus: false,
      chooseType: "", // 选择收藏或者提醒列表时
      showFire: false,
    };
  },
  /* computed: {
    todoList() {
      return this.currentItem.todoItemList.filter((v) => !v.todoStatus);
    },
    doneList() {
      return this.currentItem.todoItemList.filter((v) => v.todoStatus);
    },
  }, */
  created() {
    // 调用getTodoList方法，获取所有数据
    this.getTodoList();
    // 添加提醒的定时器
    this.noticeList.forEach((v) => {
      this.setNewTimeOut(v);
    });
  },
  methods: {
    // 开启设置提醒弹窗
    showNotice(item) {
      this.$set(item, "popTime", item.noticeTime);
      this.$set(item, "popNoticeStatus", item.noticeStatus || false);
      item.showBell = true;
    },
    // 确认提醒
    confirmNotice(item) {
      this.$set(item, "noticeTime", item.popTime);
      this.$set(item, "noticeStatus", item.popNoticeStatus);
      item.showBell = false;
      this.setNewTimeOut(item);
      this.pushData();
    },
    // 开启定时器提醒
    setNewTimeOut(item) {
      let nowDate = new Date().getTime();
      let timeDiff = item.noticeTime - nowDate;
      if (timeDiff > 0 && item.noticeStatus) {
        let timeNotice = setTimeout(() => {
          Notification.requestPermission(function (status) {
            //如果状态是同意
            if (status === "granted") {
              var m = new Notification("收到信息", {
                body: `“${item.todoName}”到时提醒`, //消息体内容
                icon: "https://img1.baidu.com/it/u=3041604093,3909442121&fm=26&fmt=auto&gp=0.jpg", //消息图片
              });
              m.onclick = function () {
                //点击当前消息提示框后，跳转到当前页面
                window.focus();
              };
            } else {
              alert("当前浏览器不支持弹出消息");
            }
            clearTimeout(timeNotice);
          });
        }, timeDiff);
      }
    },
    // 左侧列表处回车或者blur
    submitList() {
      console.log("回车或者blur");
      let item = {
        id: nanoid(),
        listName: this.name,
        todoItemList: [], //这个数组用来放小todolist们
      };
      // 回车后，将新生成的item赋值给currentItem
      this.currentItem = item;
      this.List.push(item);
      this.name = "";
      // 调用pushData方法，将数据存储到localstorage里面
      this.pushData();
      console.log("新生成的item的id是:" + item.id);
      console.log("currentid是" + this.currentItem.id);
    },
    // 删除左侧列表
    deleteItem(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          let index = this.List.findIndex((v) => v.id === data);
          this.List.splice(index, 1);
          console.log("长度是" + this.List.length);
          //⭐删除列表item之后，就当第一个元素成为当前的item,注意只剩一个的时候的情况，这里filter有问题
          if (this.List.length) {
            this.currentItem = this.List[0];
          } else {
            this.currentItem = { todoItemList: [] };
          }
          // 如果全部删完的话，右侧name还保留着最后一个currentItem

          // 调用pushData方法，将数据存储到localstorage里面
          this.pushData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 选择列表标题
    chooseItem(data) {
      this.currentItem = data;
      this.chooseType = "";
    },
    // 右侧生成小todolist回车
    submitData() {
      let todoItem = {
        id: nanoid(),
        pName: this.currentItem.listName,
        todoName: this.todoName,
        todoStatus: false, //todostatus属性根据复选框来更改
        // todoStatus: this.todoStatus,
      };
      // this.todoStatus = this.todoStatus;
      let index = this.List.findIndex((v) => v.id === this.currentItem.id);
      this.List[index].todoItemList.push(todoItem);
      this.todoName = "";

      // 调用pushData方法，将数据存储到localstorage里面
      this.pushData();
    },
    // 删除右侧小todolist,传来的是小todoitem
    deleteTodoItem(data) {
      this.$confirm(
        "将永久删除" + "“" + data.todoName + "”," + "是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const ownItem = this.List.filter((v) => v.listName === data.pName)[0];
          let index = ownItem.todoItemList.findIndex((v) => v.id === data.id);
          ownItem.todoItemList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 调用pushData方法，将数据存储到localstorage里面
          this.pushData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 传过来的是todoItem,每次change不仅要向localstorage里更新数据，还要更新doing和done的数量
    changed() {
      // this.doingNum = this.currentItem.todoItemList.length;
      // console.log("todoStatus状态更改" + 111111111111);
      // 调用pushData方法，将数据存储到localstorage里面
      this.pushData();
      if (!this.filterTodoData.length) {
        this.showFire = true;

        this.$refs.fireworks.run();
        let interval = setInterval(() => {
          this.$refs.fireworks.run();
        }, 1500);
        let timeout = setTimeout(() => {
          this.showFire = false;
          clearInterval(interval);
          clearTimeout(timeout);
        }, 5000);
      }
    },
    // 将数据存放到local storage里，每次被调用
    pushData() {
      localStorage.setItem("todolist", JSON.stringify(this.List));
    },
    // 选中收藏或提醒
    chooseFavOrNotice(type) {
      if (type === "notice") {
        this.currentItem = { todoItemList: this.noticeList };
      } else {
        this.currentItem = { todoItemList: this.favList };
      }
      this.chooseType = type;
    },
    // 收藏
    setFav(item, status) {
      this.$set(item, "favStatus", status);
      this.pushData();
    },
    getTodoList() {
      this.$axios
        .get("http://localhost/getTodoList")
        .then((res) => {
          this.List = res.data;
          console.log(res.data);
          console.log("成功");
          if (this.List.length) {
            this.currentItem = { todoItemList: [], ...this.List[0] };
          }
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
    },
  },
  // 如果localstorage里面有数据，就拿出展示

  computed: {
    // 分别返回根据todoStatus属性过滤后的数据
    filterTodoData() {
      let list = [];
      // 判断是否在重要或者提醒的列表
      if (this.chooseType === "fav") {
        list = this.currentItem.todoItemList.filter(
          (item) => !item.todoStatus && item.favStatus
        );
      } else if (this.chooseType === "notice") {
        list = this.currentItem.todoItemList.filter(
          (item) => !item.todoStatus && item.noticeStatus
        );
      } else {
        list = this.currentItem.todoItemList.filter((item) => !item.todoStatus);
      }

      return list;
    },
    filterDoneData() {
      return this.currentItem.todoItemList.filter((item) => item.todoStatus);
    },
    noticeList() {
      let list = [];
      this.List.forEach((v) => {
        const noticeItem =
          v.todoItemList &&
          v.todoItemList.filter((j) => j.noticeStatus && !j.todoStatus);
        list = [...list, ...noticeItem];
      });
      return list;
    },
    favList() {
      let list = [];
      this.List.forEach((v) => {
        const favItem =
          v.todoItemList &&
          v.todoItemList.filter((j) => j.favStatus && !j.todoStatus);
        list = [...list, ...favItem];
      });
      return list;
    },
  },
  /*  watch: {
    item: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        this.leftlist = JSON.parse(JSON.stringify(newV));
      },
      deep: true,
      immediate: true,
    },
  }, */
};
</script>

<style lang="less" scoped>
// 大盒子
.box {
  // width: 1263px;
  width: 100%;
  height: 609px;
  background-color: #fff;
  box-sizing: border-box;
}
// header部分
.header {
  width: 100%;
  height: 45px;
  line-height: 45px;
  padding: 0;
  margin: 0;
  // background-color: rgb(33, 37, 43);
  // background-color: #5599ff;#99BBFF
  // background-image: linear-gradient(to right, #00bbff, #77ddff);
  background-image: linear-gradient(to right, #77ddff, #cceeff);
  span {
    margin-left: 20px;
    font-weight: 700;
    color: #fff;
  }
}
.todo-container {
  display: flex;
}
// 当回车和选中当前列表标题时，即小li的id是当前id时，动态添加样式
.currentStyle {
  // background-color: #1e90ff;
  color: #fff !important;
  background-color: rgba(0, 191, 255, 0.7);
}
//当todoStatus更改，变成已经完成时，添加样式，实现删除线效果
.deleteStyle {
  text-decoration: line-through;
}
// 左侧部分
.leftSection {
  // float: left;
  width: 17.9%;
  height: 564px;
  border-right: 1px solid #dcdfe6;
  background-color: rgb(255, 255, 255);
  .fav-notice {
    padding: 10px 0;
    cursor: pointer;
    font-size: 14px;

    .fav-list,
    .notice-list {
      display: flex;
      justify-content: space-between;
      color: #666;
      padding: 10px;
      &:hover {
        background-color: #ecf5ff;
      }
      &.active {
        background-color: #ecf5ff;
      }
      [class^="el-icon-"] {
        color: #409eff;
      }
    }
  }
  // 添加button
  .buttonStyle {
    // width: 100%;
    // height: 40px;
    border: 0;
    display: flex;
    align-items: center;
    text-align: left;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
    color: rgb(37, 100, 207);
    background-color: #fff;
    input {
      width: 200px;
      height: 40px;
      border: 0;
      outline: none;
      // background-color: pink;
      // margin-left: 5px;
      // color: rgb(37, 100, 207);
      /* &:hover {
        background-color: rgb(236, 245, 255);
      } */
    }
    // 236,245,255
  }
  li {
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    // margin-bottom: 1px;
    line-height: 40px;
    // font-weight: 700;
    cursor: pointer;
    color: #666;
    &:hover {
      // background: rgb(236, 245, 255);
      background-color: #77ddff;
    }
    i {
      margin-left: 10px;
      margin-right: 2px;
      color: rgb(37, 100, 207);
    }
    // 左侧删除小按钮
    /deep/.el-button.is-circle {
      padding: 3px;
      background: none;
      border: none;
      color: #fff;
    }

    /deep/.el-button--danger {
      color: #fff;
      /* color: skyblue;
      background-color: #fff;
      border-color: skyblue; */
    }
  }
}
// 右侧部分
.rightSection {
  // float: right;
  // width: 82%;
  flex: 1;
  height: 564px;
  background-color: rgb(250, 249, 248);
  .add {
    margin-bottom: 8px;
    span {
      margin-left: 33px;
      font-weight: 700;
      color: rgb(37, 100, 207);
      i {
        margin-right: 8px;
      }
    }
    input {
      margin-left: 30px;
      width: 400px;
      height: 32px;
      padding-left: 10px;
      border-radius: 4px;
      margin-top: 7px;
      // border: none;
      border: 1px solid rgb(37, 100, 207);
      // outline: none;
    }
  }

  // 正在进行和已经完成
  .doing,
  .done {
    width: 100%;
    height: 40px;
    text-indent: 2em;
    // background-color: pink;
    line-height: 40px;
    padding: 8px 0;
    color: rgb(37, 100, 207);
    font-weight: 700;
    span {
      font-size: 14px;
      font-weight: 400;
      margin-left: 15px;
    }
    /* ul {
      width: 800px;
      // background-color: skyblue;
    } */
  }
  ul {
    margin: 0 40px;
  }
  li {
    position: relative;
    list-style: none;
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    margin-bottom: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 3px;
    // box-shadow: 0 0 5px #ccc;
    // box-shadow: 2px 2px 3px #ccc;
    box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1),
      0px 1.6px 3.6px rgba(0, 0, 0, 0.1);
    padding: 0 8px;
    font-size: 14px;
    color: #666;
    .el-checkbox {
      margin-right: 6px;
    }
    .notice-bell {
      color: #409eff;
    }
    // 右侧删除小按钮
    /deep/.el-button.is-circle {
      padding: 7px;
      border: none;
      margin-left: 0;
    }
  }
}
</style>