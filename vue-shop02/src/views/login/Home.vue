<template>
  <!-- 
  router	是否使用 vue-router 的模式，
  启用该模式会在激活导航时以 index 作为 path 进行路由跳转
 -->
  <div class="Home_wrap">
    <el-container>
      <!-- 头部显示 -->
      <el-header style="height: 83px;">Header</el-header>
      <el-container>
        <!-- 左边导航栏 -->
        <el-aside width="200px">

          <!-- 注意 default-active如何赋值，如何更改-->
          <el-menu class="el-menu-vertical-demo"
            router
            :default-active="active_new"
            active-text-color="#409EFF">
            <!-- 注意这里的index要为string类型，且动态绑定，要加：-->
            <el-submenu :index="item.id + ''"
              v-for="item in menuList"
              :key="item.id"
              @open="handleOpen"
              @close="handleClose"
              active-text-color="#ffd04b">

              <template slot="title">
                <i :class="iconsObject[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>

              <!-- <el-menu-item v-for="item1 in item.children"
                :index="'/'+item1.path"
                :key="item1.id">
                {{item1.authName}}
              </el-menu-item> -->

              <!--二级菜单  -->
              <el-menu-item :index="'/' + item1.path"
                v-for="item1 in item.children"
                :key="item1.id"
                @click="saveNavState('/' + item1.path)">
                <template slot="title">
                  <!-- i为图标 -->
                  <i class="el-icon-menu"></i>
                  <span>{{ item1.authName }}</span>
                </template>
              </el-menu-item>

            </el-submenu>

          </el-menu>
        </el-aside>

        <!-- 右边主题栏 -->
        <el-container>
          <el-main>
            <!-- <router-view></router-view> -->
            <router-view></router-view>

          </el-main>
        </el-container>

      </el-container>
    </el-container>
  </div>

</template>


<script>
export default {
  data() {
    return {
      menuList: [],
      iconsObject: {
        125: "iconfont icon-yonghuguanli",
        103: "iconfont icon-quanxianguanli",
        101: "iconfont icon-RectangleCopy",
        102: "iconfont icon-dingdanguanli",
        145: "iconfont icon-shujutongji",
      },
      active_new: "",
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get("/menus");
      this.menuList = res.data;
    },
    saveNavState(activePath) {
      this.active_new = activePath;
    },
    handleOpen() {},
    handleClose() {},
  },
};
</script>

<style scoped>
.iconfont {
  margin-right: 7px;
}
.Home_wrap,
.el-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.el-container .el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 83px;
  display: inline-block;
}

.el-aside {
  background-color: #d3dce6;

  color: #333;
  text-align: center;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
}
</style>