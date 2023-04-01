<template>
  <div class="home-container">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      display: flex;
      background-color: #6d6d6d;
      justify-content: space-between;
      align-items: center;
    }
    .el-aside {
      background-color: #333;
    }
    .el-main {
      background-color: #eaedf1;
    }
  }
}
</style>
