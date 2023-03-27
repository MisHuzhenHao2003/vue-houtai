<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar_box"></div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="65" class="user-password">
        <el-form-item prop="username" loginForm.username label="用户名">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="loginFormRef.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { reqLogin } from "@/utils/api";

// 表单的数据
const loginForm = reactive({
  username: "admin",
  password: "123456",
});

const loginFormRef = ref();
const router = useRouter();

// 表单的验证规则
const rules = reactive({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 1, max: 6, message: "请输入1-6位的用户名", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 11, message: "请输入3-11位的密码", trigger: "blur" },
  ],
});

function login() {
  loginFormRef.value.validate(async valid => {
    if (!valid) return;
    let { data: res } = await reqLogin(loginForm.username, loginForm.password);
    if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
    ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
    // 把token放到会话存储
    sessionStorage.setItem("TOKEN", res.data.token);
    router.push("/home");
  });
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: url("~@/assets/images/登录背景.jpg") no-repeat center center;
  position: relative;
  .login-box {
    width: 450px;
    height: 300px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    .avatar_box {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: url("~@/assets/images/logo.jpg") no-repeat center center;
      background-size: cover;
      position: absolute;
      left: 50%;
      margin-left: -70px;
      top: -70px;
    }
    .user-password {
      width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .login-btn {
        text-align: center;
      }
    }
  }
}
</style>
