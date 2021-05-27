<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->

    <el-card>
      <!-- 搜索与添加区域 -->
      <!-- 里的 slot="append"  就是一个UI摆放的位置,其实就是封装的样式布局。
            append：代表放在紧贴在依赖组件的后面
            prepend：代表放在紧贴在依赖组件的前面
      -->
      <el-row :gutter="20"
        class="row_add">
        <el-col :span="15">
          <el-input placeholder="请输入内容"
            v-model="queryInfo.query"
            @change="getUserList"
            clearable>
            <el-button slot="append"
              icon="el-icon-search"
              @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
            @click="addDiaologVisible=true">添加用户</el-button>

        </el-col>
      </el-row>

      <!-- stripe 隔行变色 -->
      <!--  用户列表区域-->
      <el-table :data="userList"
        stripe
        border>
        <!-- 第一列为索引 -->
        <!--prop  对应列内容的字段名， -->
        <el-table-column type="index">
        </el-table-column>

        <el-table-column label="姓名"
          prop="username">
        </el-table-column>

        <el-table-column label="邮箱"
          prop="email">
        </el-table-column>

        <el-table-column label="电话"
          prop="mobile">
        </el-table-column>

        <el-table-column label="角色"
          prop="role_name">
        </el-table-column>

        <!-- 因为数据是挂载到插槽上的，所以一定要用template，读取数据是通过scope.row来
          通过作用域插槽template，来渲染了状态这一列
定义了一个插槽 v-slot来接收了当前作用域（这一行）的数据
然后将开关的属性绑定到row.mg_state
若同时指定了prop，也指定了插槽，作用域插槽会覆盖prop,prop不会再生效
 -->
        <!-- 
   switch开关事件（event）change	switch 状态发生变化时的回调函数
  -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row}}    拿到当前行的状态-所有的信息-->
            <el-switch v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作"
          width="180px">
          <!-- 通过id来进行操作 -->
          <!-- 这里也要template，否则无法触发 -->
          <template slot-scope="scope">
            <!-- 修改 -->

            <el-tooltip class="item"
              effect="dark"
              content="修改"
              :enterable="false">
              <el-button type="primary"
                icon="el-icon-edit"
                @click="editDiao(scope.row.id)"
                size="mini"></el-button>
            </el-tooltip>
            <!-- 删除 -->

            <el-tooltip class="item"
              effect="dark"
              content="删除"
              :enterable="false">
              <el-button type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>

            <el-tooltip class="item"
              effect="dark"
              content="分配角色"
              :enterable="false">
              <el-button type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"></el-button>
            </el-tooltip>

            <!-- 分配角色 -->
          </template>
        </el-table-column>

      </el-table>

      <!-- 页码 -->
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!-- 添加用户的对话框 -->
      <!-- close监听对话框关闭的事件，并触发函数addDiaologClose -->
      <el-dialog title="添加用户"
        :visible.sync="addDiaologVisible"
        @close="addDiaologClose">

        <!-- ref将el-form重命名为ruleFormRef -->
        <el-form :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="70px">
          <!-- prop是验证规则属性 -->
          <el-form-item label="用户名"
            v-model="addForm.username"
            prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码"
            v-model="addForm.password"
            prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>

          <el-form-item label="邮箱"
            v-model="addForm.email"
            prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>

          <el-form-item label="电话"
            v-model="addForm.mobile"
            prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
          class="dialog-footer">
          <el-button @click="addDiaologVisible = false">取 消</el-button>
          <el-button type="primary"
            @click="addUser">确 定</el-button>
          <!-- @click="addDiaologVisible = false" -->
        </div>
      </el-dialog>
      <!-- 修改用户框 -->
      <el-dialog title="修改"
        :visible.sync="EditDiaologVisible"
        @close="exitDiaologClose">

        <el-form :model="user_info"
          label-width="70px"
          :rules="editFormRules"
          ref="editFormRef">

          <el-form-item label="用户名">
            <el-input :value="user_info.username"
              disabled></el-input>
          </el-form-item>
          <!--prop验证规则  -->
          <el-form-item label="邮箱"
            v-model="user_info.email"
            prop="email">
            <el-input v-model="user_info.email"></el-input>
          </el-form-item>

          <el-form-item label="电话"
            v-model="user_info.mobile"
            prop="mobile">
            <el-input v-model="user_info.mobile"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer"
          class="dialog-footer">
          <el-button @click="EditDiaologVisible = false">取 消</el-button>
          <el-button type="primary"
            @click="editUser">确 定</el-button>
          <!-- @click="addDiaologVisible = false" -->
        </div>
      </el-dialog>

      <!-- 分配角色对话框 -->
      <el-dialog title="分配角色"
        :visible.sync="setRoleDialogVisible"
        @close="setRoleDialogClose">
        <div>
          <p>当前的用户：{{setRoleUserInfo.username}}</p>
          <p>当前的角色：{{setRoleUserInfo.role_name}}</p>
          <p>分配新角色：</p>
          <el-select v-model="selectRoleId"
            placeholder="请选择">
            <el-option v-for="item in rolesList"
              :key="item.id"
              :value="item.id"
              :label="item.roleName">

            </el-option>

          </el-select>

        </div>

        <div slot="footer">
          <el-button @click="setRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary"
            @click="saveRoleInfo(setRoleUserInfo.id)">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>

  </div>
</template>


<script>
export default {
  data() {
    //验证手机号的自定义规则

    var checkMobil = (rule, value, callback) => {
      //验证手机号的正则
      const regMobile = /^0{0,1}(13[4-9]|15[7-9]|15[0-2]|18[7-8])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };

    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1, //当前的页数
        pagesize: 5, //当前每页显示多少数据
      },
      userList: [],
      total: 0,
      //控制添加用户框的显示与隐藏
      addDiaologVisible: false,
      formLabelWidth: "120px",
      //添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //修改用户框
      //显示与否
      EditDiaologVisible: false,
      // 分配角色
      setRoleDialogVisible: false,

      //通过id查询的数据
      user_info: {},

      //获取的全部角色列表
      rolesList: [],

      //分配权限时，显示的当前的用户信息展示
      setRoleUserInfo: {},

      //下拉框选中的角色的id
      selectRoleId: "",

      //添加用户的表单数据的验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3-10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "密码的长度在6-10个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: checkMobil, trigger: "blur" },
        ],
      },
      //修改用户表单数据的验证规则
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: checkMobil, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    /*validate	任一表单项被校验后触发	
    被校验的表单项 prop 值，
    校验是否通过，错误消息（如果存在） */
    async addUser() {
      //先预校验
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        //则返回，不走添加的业务逻辑了
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201) {
          return this.$message.error("添加用户失败");
        }

        this.$message.success("添加用户成功");
        this.addDiaologVisible = false;
        this.getUserList(); //刷新用户列表
      });
      // console.log(this.$http.post("users", { params: this.addForm }));
      console.log(res);
    },

    async getUserList() {
      // console.log(
      //   await this.$http.get("users", {
      //     params: this.queryInfo,
      //   })
      // );
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });

      if (res.meta.status !== 200)
        return this.$message.error("获取用户列表失败");

      this.userList = res.data.users;
      console.log(this.userList);
      this.total = res.data.total;
    },
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      //改变了每页大小，重新
      this.getUserList();
    },
    //监听页码值改变的 事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //监听switch状态的改变
    //通过绑定change就能拿到最新的数据
    async userStateChange(row) {
      // 由于uid是动态参数
      //单引号内部的东西全部解析为字符串，反引号加${}是为了使用变量，要不然会将变量全部解析为字符串
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      );

      //判断res的结果
      if (res.meta.status !== 200) {
        //虽然数据库没有修改成功，但页面也要修改回来
        row.mg_state = !row.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户状态成功");
    },
    //监听添加用户会话框关闭
    addDiaologClose() {
      this.$refs.addFormRef.resetFields();
    },

    //根据id查询并显示数据
    async editDiao(id) {
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("查询用户信息失败");
      }
      this.user_info = res.data;

      this.EditDiaologVisible = true;
    },
    //根据id修改数据
    editUser(id) {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.put(
          "users/" + this.user_info.id,
          {
            email: this.user_info.email,
            mobile: this.user_info.mobile,
          }
        );

        if (res.meta.status !== 200) return this.$message.error("更新用户失败");

        this.getUserList(); //更新数据列表
        //关闭对话框
        this.EditDiaologVisible = false;
        this.$message.success("更新用户成功");
      });
    },

    exitDiaologClose() {
      this.$refs.editFormRef.resetFields();
    },

    //删除弹出的弹窗
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // console.log(confirmResult); 若用户确认删除，则返回为字符串  点击取消，会报错，z则要catch---
      //如果取消了，则返回值cancle
      if (confirmResult != "confirm") return this.$message.info("已取消删除");

      //else 确认按了删除
      const { data: res } = await this.$http.delete("users/" + id);
      if (res.meta.status !== 200) return this.$message.error("删除用户失败");
      this.$message.success("删除该用户成功");
      this.getUserList();
    },

    //分配角色
    async setRole(row) {
      console.log(row);
      this.setRoleDialogVisible = true;
      //在展示对话框之前，获取所有的角色的列表
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200)
        return this.$message.error("获取角色列表失败");
      this.rolesList = res.data;
      this.setRoleUserInfo = row;
    },

    //点击按钮 保存分配角色信息
    async saveRoleInfo(id) {
      //若没有选择新的角色
      if (!this.selectRoleId) {
        return this.$message.error("请选择要分配的角色");
      }
      //选择了新的角色
      const { data: res } = await this.$http.put(`users/${id}/role`, {
        rid: this.selectRoleId,
      });
      if (res.meta.status !== 200) return this.$message.error("分配角色失败");

      this.$message.success("分配角色成功");
      this.getUserList();
      this.setRoleDialogVisible = false;
    },
    //监听分配角色对话框的关闭
    setRoleDialogClose() {
      this.selectRoleId = "";
      this.setRoleUserInfo = "";
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>