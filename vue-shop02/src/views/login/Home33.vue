<template>
  <el-container class="home_container">
    <!-- el-header头部区 -->
    <el-header>
      <div>
        <img src="#"
          alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container class="_container">
      <!-- aside侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 侧边栏菜单区域 -->
        <div class="toggle-button"
          @click="toggleCollapse">|||</div>
        <!-- unique-opened="true" 左侧菜单每次只允许展开一个 -->
        <!-- 为什么这里
        :collapse-transition="false"
        要前面加：动态的意思，折叠效果才能消失？？？
         -->
        <!-- 第一步：menu开启路由模式
        第二步：通过Index属性，作为跳转地址（item1.path）
          router:是否使用 vue-router 的模式，
          启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <!-- 点击链接-将对应的path保存到sessionStorage中-点击赋值给default-active
         -->
        <!-- 
             :default-active   当前激活菜单的Index

          -->

        <el-menu unique-opened
          :default-active="active_new"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eee"
          :collapse="isCollapse"
          :collapse-transition="false"
          router>
          <!-- 一级菜单 -->
          <!-- 应该每个都属于自己的Index  否则点击一下，都会展开 -->
          <!-- index="应该是字符串"，但是绑定的id为数字，则解决方法就是后面拼接一个空字符串 -->
          <el-submenu :index="item.id + ''"
            v-for="item in leftMenuList"
            :key="item.id">
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- i为图标 -->
              <i :class="iconsObject[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

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

      <!-- main右边主体 -->
      <el-main>
        <!-- main主体放一个路由占位符 -->
        <!-- 简单来说就是占位符，它会帮你占好位置，等你需要的时候直接将html传入，它会帮你显示出来。 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 页面加载时就有数据，所以写在这里
  created() {
    this.getMenuList();
    this.activePath_s = window.sessionStorage.getItem("activePath");
  },

  data() {
    return {
      //左侧菜单列表
      leftMenuList: [],
      iconsObject: {
        125: "iconfont  icon-users",
        103: "iconfont  icon-tijikongjian",
        101: "iconfont  icon-shangpin",
        102: "iconfont  icon-danju",
        145: "iconfont  icon-baobiao",
      },
      isCollapse: false,
      // 从sessionStorage拿出的被激活的链接地址
      activePath_s: "",
      active_new: "",
    };
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear();
      // 重新到登陆
      this.$router.push("/login");
    },

    //获得左侧菜单
    async getMenuList() {
      //发出请求  this.$http.get('/menus')为一个promise函数
      const { data: res } = await this.$http.get("/menus");
      if (res.meta.status !== 200) {
        return this.$message.error("erro");
      }
      this.leftMenuList = res.data;
    },
    // getMenuList() {
    //   this.$http
    //     .get("/menus")
    //     .then((result) => {
    //       console.log("sss");
    //       console.log(result);
    //       const { data: res } = result;
    //       this.setData({
    //         leftMenuList: res.data,
    //       });
    //     })
    //     .catch((result) => {
    //       console.log("erro");
    //       console.log(result);
    //       return this.$message.error("erro");
    //     });
    // },
    // 按下|||切换左侧的菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态-参数为-当前激活菜单的 index
    saveNavState(activePath) {
      this.active_new = activePath;

      //以下是通过点击事件-保存地址到sessionStorage-加载时（created）就将sessionS中的值赋值，再更新值
      // window.sessionStorage.setItem("activePath", activePath);
      // //每次点击后，重新复制
      // this.activePath_s = activePath;
    },
  },
};
</script>

<style scoped>
.home_container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.el-menu {
  border: 0;
}
.el-header {
  display: flex;
  padding: 0 0;
  /* 这句使右边登陆按钮居中展示 */
  align-items: center;
  justify-content: space-between;
  background-color: #373d41;
}
.el-header div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.el-header span {
  flex: 1;
  padding: 14px;
  color: #eee;
  font-size: 20px;
}
.el-button {
  margin-right: 20px;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #ffff;
  text-align: center;
  /* 每个字之间的间距 */
  letter-spacing: 0.2em;
  /* 鼠标点上去，变成一个小手  */
  cursor: pointer;
}
</style>
