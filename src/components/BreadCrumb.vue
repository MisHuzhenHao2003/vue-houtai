<template>
  <!-- 面包屑区域 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: 'WelCome' }" @click="todoHome">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in usersStore.activeMenus">{{ item }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useUserInfoStore } from "@/store/users.js";

const usersStore = useUserInfoStore();

const todoHome = () => {
  usersStore.activeMenus = [];
  sessionStorage.removeItem("activeMenus");
};
</script>

<style lang="scss" scoped></style>
