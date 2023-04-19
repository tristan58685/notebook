<template>
  <div class="box">
    <!-- 正常富文本编辑器组件 -->
    <div style="border: 1px solid #cccS" v-show="!showSearch">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />

      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="selfText"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
      <el-button
        class="buttonStyle"
        @click="preserveText(selfText)"
        type="primary"
        plain
        >保存</el-button
      >
    </div>
    <!-- 根据showSearch,只展示搜索的数据 -->
    <div v-show="showSearch" @click="showEditor">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="searchEditor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />

      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="searchText"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated1"
      />
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
import axios from "@/utils/request";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// import axios from "axios";
export default {
  name: "MyEditor",
  components: { Editor, Toolbar },

  data() {
    return {
      rightList: this.noteList, //数据是从父组件流向子组件
      editor: null, //编辑器实例
      // html: "<p>hello</p>", //放到v-model
      toolbarConfig: {}, //工具栏配置
      editorConfig: { placeholder: "请输入内容...", autoFocus: false }, //编辑器配置
      mode: "default", // or 'simple'
      selfText: this.text, //编辑器文本，父组件props传过来
      searchEditor: null, //编辑器实例（用来展示）
      showSearch: false, //控制两个编辑器展示的状态，默认是正常编辑器
      searchText: "", //编辑器实例（用来展示）
    };
  },
  props: ["text", "searchKeyword", "currentId"],
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    onCreated1(editor) {
      this.searchEditor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      this.searchEditor.disable();
    },
    // 用来展示的编辑器click事件后，就切换并聚焦到正常编辑器
    showEditor() {
      this.searchText = "";
      this.searchEditor.setHtml(this.searchText);
      this.showSearch = false;
      this.editor.focus();
    },
    // 当点击保存，把当前内容传送给父组件
    // preserveText(data) {
    //   // this.$emit("receiveText", data);
    //   this.$message({
    //     message: "保存成功！",
    //     type: "success",
    //   });
    // },
    getAll(data) {
      this.$emit("getAll", data);
    },
    // 更新数据
    preserveText(data) {
      //修改操作
      axios
        .post("http://localhost/upNotelist", {
          params: {
            id: this.currentId,
            value: data,
            type: "text",
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.getAll();
          this.$message({
            message: "保存成功！",
            type: "success",
          });
        });
    },
    // 让查找到关键字并且添加样式的文本替换原来的文本，切换展示查找数据的编辑器
    replaceText() {
      const text = this.selfText.replace(
        new RegExp(this.searchKeyword, "g"),
        `<span style="background-color: rgb(255, 251, 143)">${this.searchKeyword}</span>`
      );
      this.showSearch = true;
      this.searchText = text;
      this.searchEditor.setHtml(this.searchText);
    },
  },
  watch: {
    text: {
      //监听text的变化，如果searchKeyword变化（发生查找动作），就调用replaceText方法
      handler(newV, oldV) {
        // console.log(newV);
        this.selfText = newV;
        // if (oldV && !newV) {
        //   this.$nextTick(() => {
        //     this.editor.setHtml(this.searchText);
        //   });
        // }
        this.editor && this.editor.setHtml(this.selfText);
        this.$forceUpdate();
        if (this.searchKeyword) {
          this.replaceText();
        }
      },
      immediate: true,
    },
    searchKeyword: {
      //如果searchKeyword变化，调用replaceText方法，
      handler(newV, oldV) {
        if (newV) {
          this.replaceText();
        } else {
          this.searchText = "";
          this.searchEditor.setHtml(this.searchText);
          this.showSearch = false;
        }
        this.$nextTick(() => {
          this.$emit("inputFocus");
        });
      },
      // immediate: true,
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css" >
</style>
<style scoped>
.box {
  float: right;
  width: 960px;
  height: 600px;
  /* background-color: #aaaaaa; */
  /* background-image: linear-gradient(to right, lightblue, skyblue); */
  /* background-color: rgb(33, 37, 43); */
  background-color: rgb(223, 223, 223);
}
.w-e-toolbar {
  background-color: #aaaaaa !important;
}
.w-e-text-container {
  background-color: #f5f5f5;
}
.buttonStyle {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px 0;
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 3px;
}
.buttonStyle:hover {
  background: lightblue;
}
</style>