<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xl="6" :lg="7">
        <h2>公司风险诊断可视化系统</h2>
        <el-image :src="require('@/assets/city.jpg')"></el-image>
      </el-col>
      <el-col :span="1">
        <el-divider direction="vertical"></el-divider>
      </el-col>
      <el-col :span="6">
        <h2>欢迎登录</h2>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="用户名" prop="username" style="width: 380px;">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px;">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width: 380px;">
            <el-input v-model="loginForm.code" style="width:172px;float:left;"></el-input>
            <el-image :src="captchaImg" class="captchaImage" @click="getCaptcha"></el-image>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import qs from "qs"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度 5 个字符', trigger: 'blur' }
        ]
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 关于axios的一些介绍:
          // axios 是一个流行的用于发起 HTTP 请求的 JavaScript 库
          // 请求函数里面包括请求方式，路径， 传入的参数
          // 在 axios 中，当请求成功并返回响应时，.then 方法会被调用，传入一个包含响应数据的参数，可以在该回调函数中处理返回的数据。
          // 还有一个.catch 方法。它是用来处理操作失败的回调函数。如果请求出错或被拒绝，.catch 方法会被调用，并将错误对象作为参数传递给回调函数。

          // qs.stringify() 是一个用于将对象序列化为 URL 查询字符串（key-value）的函数
          // 它可以将 this.loginForm 对象转换为 URL 查询字符串的形式。
          this.$axios.post('/login?' + qs.stringify(this.loginForm)).then(res =>{
            // 提交表单之后，从Header中获取用户的authorization，也就是含有用户登录信息的jwt，然后提交到store中进行状态管理。

            const jwt = res.headers['authorization']
            this.$store.commit("SET_TOKEN", jwt)
            this.$router.push("/index")

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {

        console.log("/captcha")
        console.log("res===="+res)

        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
        console.log("capt==="+this.captchaImg)
        this.loginForm.code = ''

        console.log(this.loginForm.token)
      })
    },
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style>

.captchaImage {
  float: left;
  margin-left: 8px;
  border-radius: 8px;
}
.el-row {
  background-color: #fafafa;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
}

.el-divider {
  height: 200px;
}
</style>

