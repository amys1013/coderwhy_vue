<template>
  <div class="login_container">

    <div class="login_wrap">

      <!-- 头像部分 -->
      <div class="img_wrap">
        <img src="../../assets/images/logo.png"
          alt="" />

      </div>
      <!-- 登陆表单部分 -->

      <div class="form_wrap">
        <el-form :model="ruleForm"
          status-icon
          :rules="LoginRules"
          ref="ruleFormRef"
          label-width="100px"
          class="demo-ruleForm">

          <el-form-item label="用户名"
            prop="username">
            <el-input v-model="ruleForm.username"
              autocomplete="on"></el-input>
          </el-form-item>

          <el-form-item label="密码"
            prop="password">
            <el-input type="password"
              v-model="ruleForm.password"
              autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
              @click="submitForm('ruleFormRef')">提交</el-button>
            <el-button @click="resetForm('ruleFormRef')">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>

</template>


<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      // 表单的验证对象
      LoginRules: {
        username: [
          { required: true, message: "请输入登陆名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登陆名称", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  created() {},
  methods: {
    submitForm(FormName) {
      console.log(FormName);
      console.log(this.$refs);
      //   console.log(this.$refs[FormName]);
      this.$refs[FormName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post("/login", this.ruleForm);
          if (res.meta.status !== 200) return this.$message.error("登录失败");

          //登陆成功的话将token 存储到里面
          window.sessionStorage.setItem("token", res.data.token);

          this.$message.success("登陆成功");
          this.$router.push("/home");
          //然后跳转
          /**
           * 除了使用< router-link >创建< a >标签来定义导航链接以外，
           * 还可以使用router的实例方法，通过代码来导航这种方式就叫做编程式导航。
           * 要导航到不同的URL，可以使用Router实例的push()方法。该方法的原型如下：
           */
        } else return this.$message.error("验证失败");
      });
    },

    resetForm(FormName) {
      //resetField	对该表单项进行重置，将其值重置为初始值并移除校验结果
      this.$refs[FormName].resetField;
      this.ruleForm = {};
    },
  },
};
</script>


<style  scoped>
div {
  box-sizing: border-box;
}
.body {
  padding: 0;
}
.login_container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #35495e;
  min-width: 1000px;
  /* position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;

  background-color: #35495e; */
}
.login_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 380px;
  background-color: #eee;
}
.img_wrap {
  position: absolute;
  top: -30px;
  left: 50%;

  transform: translateX(-50%);

  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #fff;
  box-shadow: 1px 1px 13px rgba(0, 0, 0, 0.3);

  width: 130px;
  height: 130px;
}

.img_wrap img {
  width: 100%;
  height: 100%;
}

.form_wrap {
  position: absolute;
  top: 31%;
  left: 50%;

  transform: translateX(-50%);

  width: 84%;
  height: 64%;
}
.form_wrap .el-form {
  width: 100%;
  height: 100%;
}
.el-button {
  float: left;
  margin-left: 86px;
}
</style>