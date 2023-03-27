<template>
  <div class="home-container">
    <el-button type="warning" @click="loginOut">退出登录</el-button>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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

<style lang="scss" scoped></style>
