<template>
  <div class="appmain-wrap">

    <el-backtop target=".appmain-wrap"></el-backtop>
    <div class="con">
      vfdv vn
    </div>

  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scope>
.con {
  width: 100%;
  height: 1400px;
  background-color: lawngreen;
}
.appmain-wrap {
  height: 100vh;
  overflow: scroll;
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  /* 这里给app一个滚动效果 */
  overflow-y: scroll;
}
</style>

