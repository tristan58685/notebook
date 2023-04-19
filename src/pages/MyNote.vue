<template>
  <div>
    <LeftLeft
      @editname="editName"
      @deleteItem="deleteItem"
      :notelist="noteList"
      :currentId="currentId"
      ref="leftMenu"
      @receiveCurrentId="receiveCurrentId"
      @receiveNewItem="receiveNewItem"
      @searchdata="searchData"
    ></LeftLeft>
    <!-- <LeftLeft></LeftLeft> -->
    <MyEditor
      v-if="noteList.length"
      ref="myEditor"
      :text="text"
      @inputFocus="inputFocus"
      :searchKeyword="searchKeyword"
      @receiveText="receiveText"
    ></MyEditor>
  </div>
</template>

<script>
import axios from "axios";
import LeftLeft from "../components/ProNote/LeftLeft.vue";
import MyEditor from "../components/ProNote/MyEditor.vue";

export default {
  name: "MyNote",
  components: {
    LeftLeft,
    MyEditor,
  },
  data() {
    return {
      noteList: [],
      // 当前id只有点击和新增事件后才传过来
      currentId: "",
      text: "",
      searchKeyword: "",
    };
  },
  // 如果localstorage里面有数据，就拿出展示
  created() {
    this.getNoteList();
    /* if (localStorage.getItem("notelist")) {
      this.noteList = JSON.parse(localStorage.getItem("notelist")); */
    // 如果notelist里面有数据，默认进来展示第一条笔记
  },
  methods: {
    // 子组件enter和blur的时候调用,data就是item
    editName(data) {
      let index = this.noteList.findIndex((v) => v.id === data.id);
      // 这里要考虑新增，如果是新增，那只能enter,blur之后才往父组件传数据
      if (index === -1) {
        this.noteList.push(data);
        // 如果是新增，往notelist里push
      } else {
        this.noteList[index].name = data.name;
        this.noteList[index].editStatus = false;
      }
      console.log(this.noteList);
      localStorage.setItem("notelist", JSON.stringify(this.noteList));
    },
    //left删除标题后，传回id，父组件接收到id,删除对应item，然后存储到localstorage
    deleteItem(data) {
      let index = this.noteList.findIndex((v) => v.id === data);
      console.log("当前要删除的元素在notelist里是第" + index + "个");
      // 加判断条件,如果当前删除的item是选中的item,当前id为空，text也为空
      this.noteList.splice(index, 1);
      /* if (data === this.currentId) {
        this.currentId = "";
        this.text = "";
      } */
      if (data === this.currentId && this.noteList.length) {
        this.currentId = this.noteList[0].id;
        this.text = this.noteList[0].text;
      }

      localStorage.setItem("notelist", JSON.stringify(this.noteList));
    },
    // 接收当前的id
    receiveCurrentId(data) {
      // console.log(this.$refs);
      console.log(data);
      this.currentId = data.id;
      let index = this.noteList.findIndex((v) => v.id === this.currentId);
      // console.log(index);
      this.text = index >= 0 ? this.noteList[index].text : "";
    },
    //接收新的item
    receiveNewItem(item) {
      // console.log("新的item是", item);
      this.noteList.push(item);
      // console.log("notelist", this.noteList);
    },
    // 接收当前保存的text内容
    // 当点击的时候，向父组件传内容数据，根据当前id匹配，存到item里面，
    receiveText(data) {
      // console.log("保存的内容是" + data);
      // console.log("当前的id是" + this.currentId);
      let index = this.noteList.findIndex((v) => v.id === this.currentId);
      this.noteList[index].text = data;
      // console.log(999999, this.noteList[index].text);

      this.text = data;
      // console.log(this.text);
      console.log(this.noteList, 11111);
      localStorage.setItem("notelist", JSON.stringify(this.noteList));
    },
    // 当查找数据时，left组件传来查找的关键字
    searchData(data) {
      console.log("searching");
      this.searchKeyword = data;
    },
    inputFocus() {
      this.$refs.leftMenu.inputFocus();
    },

    getNoteList() {
      axios
        .get("http://localhost/getNoteList")
        .then((res) => {
          this.noteList = res.data;
          if (this.noteList.length) {
            // this.currentId = { noteList: [], ...this.item[0] };
            this.currentId = this.noteList[0].id;
            this.text = this.noteList[0].text;
          }
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

<style scoped>
</style>