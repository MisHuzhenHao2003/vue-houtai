<template>
  <div class="left">
    <img src="@/assets/images/logo.png" alt="" />
    <span>后台管理系统</span>
  </div>
  <el-button type="warning" @click="loginOut">退出登录</el-button>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

// 退出登录
function loginOut() {
  sessionStorage.removeItem("TOKEN");
  router.push("/login");
  ElMessage({
    message: "退出登录成功",
    showClose: true,
    type: "success",
  });
}
</script>

<style lang="scss" scoped>
.left {
  width: 25%;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 800;
  img {
    width: 120px;
    height: 60px;
    margin-right: 12px;
  }
}
</style>
