<template>
  <!-- 表格区域 -->
  <el-table border :data="rightsStore.rightList" style="width: 100%">
    <el-table-column type="index" label="#" width="60" />
    <el-table-column prop="authName" label="权限名称" width="180" />
    <el-table-column prop="path" label="路径" />
    <el-table-column label="权限等级" width="180">
      <!-- 通过作用域插槽拿到各行数据 -->
      <template v-slot:default="{ row, index }">
        <el-tag class="mx-1" effect="dark" v-if="row.level == 0"> 一级 </el-tag>
        <el-tag class="mx-1" effect="dark" type="success" v-else-if="row.level == 1"> 二级 </el-tag>
        <el-tag class="mx-1" effect="dark" type="warning" v-else> 三级 </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useRightsStore } from "@/store/rights.js";
import { onMounted } from "vue";

const rightsStore = useRightsStore();

onMounted(() => {
  rightsStore.getRightsList();
});
</script>

<style lang="scss" scoped></style>
