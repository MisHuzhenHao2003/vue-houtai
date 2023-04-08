<template>
  <CateDialog></CateDialog>
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="addCate">添加分类</el-button>
      </el-col>
    </el-row>
    <TreeTable></TreeTable>
  </el-card>
</template>

<script setup>
import TreeTable from "./components/TreeTable.vue";
import CateDialog from "./components/CateDialog.vue";
import { useGoodsStore } from "@/store/goods.js";

const goodsStore = useGoodsStore();

const addCate = () => {
  goodsStore.dialogVisible = true;
  goodsStore.isAddOrUpdate = false;
  goodsStore.addCate = {
    cat_pid: 0,
    cat_name: "",
    cat_level: 0,
  };
  goodsStore.PreCategories = [];
};
</script>

<style lang="scss" scoped></style>
