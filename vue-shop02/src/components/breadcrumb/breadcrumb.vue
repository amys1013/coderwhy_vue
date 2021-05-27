<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{title1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{title2}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>111
      {{title1}}
    </div>

  </div>

</template>

<script>
export default {
  components: {},

  props: {
    title1: {
      type: String,
      default: "",
    },
    title2: {
      type: String,
      default: "",
    },
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
<style scoped></style>;
