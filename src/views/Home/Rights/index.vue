<template>
  <!-- 权限管理区域 -->
  <el-card>
    <!-- 表格区域 -->
    <RightsTable></RightsTable>
  </el-card>
</template>

<script setup>
import RightsTable from "./components/RightsTable.vue";
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
}
</style>
