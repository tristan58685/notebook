<template>
  <div class="box">
    <!-- <button></button> -->
    <el-button class="newpage" @click="add">添加页</el-button>
    <el-input
      class="search"
      placeholder="搜索"
      prefix-icon="el-icon-search"
      v-model="input"
      size="small"
      ref="searchInput"
      @input="SearchData"
      clearable
    >
    </el-input>
    <ul class="alllist">
      <li
        v-for="item in leftList"
        :key="item.id"
        class="listyle"
        @click="chooseItem(item)"
        :class="{
          currentStyle: item.id === currentId,
          hoverStyle: item.showStatus,
        }"
        @mouseenter="mouseEnterItem(item)"
        @mouseleave="mouseLeaveItem(item)"
      >
        <el-dropdown
          :tabindex="100"
          v-show="item.showStatus && !input"
          @command="(command) => handleCommand(command, item)"
          @visible-change="(status) => visibleChange(status, item)"
          class="dropdown"
        >
          <el-button icon="el-icon-more-outline" circle size="mini"></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="rename">重命名</el-dropdown-item>
            <el-dropdown-item command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div
          class="name"
          v-show="!item.editStatus"
          v-html="input ? item.nameHtml : item.name"
        ></div>
        <input
          v-model="item.name"
          type="text"
          v-show="item.editStatus"
          placeholder="请输入标题"
          :ref="item.id"
          @keyup.enter="enterItem(item)"
          @blur="transferData(item)"
        />
        <!-- 如果使用组件的话，键盘事件后面要加上.native -->
      </li>
    </ul>
  </div>
</template>
<script>
import { nanoid } from "nanoid";
import axios from "@/utils/request";
import { cloneDeep } from "lodash";

export default {
  name: "LeftLeft",
  data() {
    return {
      closed: false,
      id: "",
      leftList: [],
      idnum: "",
      input: "",
    };
  },
  // currentId是根据chooseitem选择事件来获取的
  // props: ["noteList", "currentId"],
  props: {
    noteList: {
      type: Array,
      default: [],
    },
    currentId: {
      type: String,
      default: "",
    },
  },
  watch: {
    noteList: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        console.log("new", newV);
        // console.log("====================");
        // console.log("olld", oldV);
        // console.log(cloneDeep);
        if (this.input) {
          return;
        }
        this.leftList = cloneDeep(newV);
        // if (this.leftList.length && this.noteList.length) {
        //   this.leftList.forEach((v) => {
        //     v = this.noteList.filter((j) => j.id === v.id)[0];
        //   });
        // }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    /* !!(修改)当点击添加页，生成随机id,往leftList里存放数据，输入框聚焦，下拉菜单不显示
     id是随机生成的，name是标题,text是文本内容，editstatus是输入框显示开关，showStatus是下拉菜单显示开关 */
    add() {
      this.idnum = nanoid();
      let item = {
        id: this.idnum,
        name: "",
        editStatus: true, //输入框显示开关
        text: "",
        showStatus: false, //下拉菜单显示开关
      };
      // 现在不push的原因是，leftList是根据watch事件来更新的
      // this.leftList.push(item);
      // 调用add方法，把item传过去
      this.chooseItem(item);

      this.addNotelist(item);
      // this.$emit("receiveNewItem", item);
      // 当新增的时候，调用chooseitem方法
      // this.chooseItem(item);
      //页面的操作写到nexttick钩子里面，数据的一般不要写在里面
      // item.editStatus = true;

      // this.$nextTick(() => {
      //   // 打log看，数据里面只有一个元素，0是为了取数组里的元素
      //   // 当 v-for 用于元素或组件的时候，引用信息将是包含 DOM 节点或组件实例的数组。
      //   console.log(item);
      //   console.log(this.$refs[this.currentId]);
      //   this.$refs[this.currentId][0].focus();
      // });
    },
    //鼠标移入
    mouseEnterItem(item) {
      this.$set(item, "showStatus", true);
    },
    mouseLeaveItem(item) {
      if (item.dropdownStatus) {
        return;
      }
      this.$set(item, "showStatus", false);
    },
    editInput() {
      this.$refs[this.currentId][0].focus();
    },
    enterItem(item) {
      this.$refs[item.id][0].blur();
    },
    // 点击blur，输入框editstatus变成false,聚焦消失，把当前item传给父组件
    transferData(item) {
      //再加判断，标题不能为空
      if (!item.name) {
        this.$message.error("笔记标题不能为空");
        return;
      }
      item.editStatus = false;
      this.upNotelist(item);
      // this.$emit("editname", item);
    },
    // 点击标题，状态是click,把当前item传给父组件
    chooseItem(item) {
      // this.idnum = item.id;
      console.log("当前的id是" + this.currentId);
      this.$emit("receiveCurrentId", item);
      console.log("当前的id是" + this.currentId);
    },
    //点击下拉框菜单子项
    handleCommand(command, item) {
      // this.$message("click on item " + command);
      console.log(command);
      // 当选择重命名,editStatus为true,输入框聚焦,修改之后enter或blur
      if (command == "rename") {
        // item.editStatus = true;
        this.$set(item, "editStatus", true);
        this.$nextTick(() => {
          console.log(this.$refs[item.id][0]);
          this.$refs[item.id][0].focus();
          // console.log("当前的id是:" + this.idnum);
        });
        // 当选择删除,把当前id传给父组件
      } else if (command == "delete") {
        this.$confirm("此操作将永久删除该笔记, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            console.log("当前要删除的id是" + item.id),
              this.delNotelist(item.id);
            // this.$emit("deleteItem", item.id);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 下拉框出现/隐藏时触发
    visibleChange(status, item) {
      item.dropdownStatus = status;
      if (!status) {
        item.showStatus = false;
      }
      // console.log(status, item);
    },
    inputFocus() {
      this.$refs.searchInput.focus();
    },
    // 查找
    SearchData() {
      // console.log("seachdata", this.leftList);
      this.$emit("searchdata", this.input);
      //遍历查找符合条件的list,返回的是符合结果的leftList集合
      // console.log(this.leftList.filter((v) => v.name.includes(this.input)));
      // let newArray = this.leftList.filter((v) => v.name.includes(this.input));
      // console.log(newArray);

      let newArray = [];
      let currentFlag = false;
      if (this.input) {
        this.noteList.map((item) => {
          // currentFlag = false;
          // name和text搜索关键词
          if (
            item.name.includes(this.input) ||
            item.text.includes(this.input)
          ) {
            // newArray.push(item);
            item.nameHtml = item.name.replace(
              new RegExp(this.input, "g"),
              `<span style="background-color: rgb(255, 251, 143);color:#666">${this.input}</span>`
            );
            // return item;
            newArray.push(item);
            if (item.id === this.currentId) {
              currentFlag = true;
            }
          } else {
            item.nameHtml = item.name;
          }
        });
        this.leftList = newArray;
        if (!currentFlag && this.leftList.length) {
          this.chooseItem(this.leftList[0]);
        } else if (!this.leftList.length) {
          this.chooseItem({});
        }
      } else {
        this.leftList = this.noteList;
      }
    },
    getAll(data) {
      this.$emit("getAll", data);
    },
    // 往数据库里面添加数据
    addNotelist(data) {
      //添加操作
      axios
        .post("http://localhost/addNotelist", {
          params: {
            id: data.id,
            name: data.name,
            // editStatus: data.editStatus,
            text: data.text,
            // showStatus: data.showStatus,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.getAll({ editStatus: true });
        });
    },
    // 更新数据
    upNotelist(data) {
      //修改操作
      axios
        .post("http://localhost/upNotelist", {
          params: {
            id: data.id,
            value: data.name,
            type: "name",
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.getAll();
        });
    },
    // 删除数据
    delNotelist(data) {
      //修改操作
      axios
        .post("http://localhost/delNotelist", {
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

          this.getAll();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  float: left;
  width: 300px;
  height: 600px;
  // background-color: #f5f5f5;
  background-color: rgb(33, 37, 43);
}
.newpage {
  margin: 5px 0;
  padding: 8px 10px;
  // background-color: rgba(135, 206, 235, 0.7);
  background-color: rgb(244, 244, 244);
  border: rgba(130, 211, 244, 0.5);
  border-radius: 3px;
  cursor: pointer;
}
.search {
  width: 300px;
  margin-bottom: 5px;
}
.alllist .listyle {
  position: relative;
  // background-color: #fff;
  background-color: rgb(33, 37, 43);
  // margin-bottom: 10px;
  transition: all linear 0.2s;
  // color: #666;
  color: rgb(244, 244, 244);
  padding: 5px;
  cursor: pointer;

  .name {
    height: 30px;
    line-height: 30px;
  }
  &.hoverStyle {
    box-shadow: -2px 1px 8px #7d949c4d;
    position: relative;
    z-index: 99;

    /*  background-image: linear-gradient(
      to right,
      rgba(135, 206, 235, 0.4),
      rgba(173, 216, 230, 0.4)
    ); */
    background-image: linear-gradient(
      to right,
      rgba(135, 206, 235, 0.6),
      rgba(173, 216, 230, 0.6)
    );
  }
  &.currentStyle {
    // background-color: #fff;
    /* background-image: linear-gradient(
      to right,
      rgba(135, 206, 235, 0.5),
      rgba(173, 216, 230, 0.5)
    ); */
    background-image: linear-gradient(
      to right,
      rgba(135, 206, 235, 0.9),
      rgba(173, 216, 230, 0.9)
    );
  }
}
input {
  display: block;
  width: 88%;
  height: 30px;
  outline-style: none;
  padding-left: 5px;
  border: 0;
  background-color: #fff;
  transition: all linear 0.2s;
  color: #666;
  cursor: pointer;
  border-radius: 5px;
}

/deep/ .dropdown {
  position: absolute;
  bottom: 5px;
  right: 3px;
}
/deep/.el-icon-more-outline {
  color: skyblue;
}
</style>