<template>
  <!-- 表格区域 -->
  <el-table :data="goodsStore.goods" border style="width: 100%">
    <el-table-column type="index" label="#" width="60" />
    <el-table-column prop="goods_name" label="商品名称" />
    <el-table-column prop="goods_price" label="商品价格" width="130px" />
    <el-table-column prop="goods_weight" label="商品重量" width="130px" />
    <el-table-column prop="upd_time" label="创建时间" width="130px" />
    <el-table-column label="操作" width="120px">
      <template v-slot:default="{ row, index }">
        <el-button type="primary" :icon="Edit" @click="modifyGoods(row)" circle />
        <el-button type="danger" :icon="Delete" @click="deleteHandler(row.goods_id)" circle />
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加用户对话框区域
     -->
</template>

<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useGoodsStore } from "@/store/goods.js";
import { ElMessage, ElMessageBox } from "element-plus";

const goodsStore = useGoodsStore();

const deleteHandler = id => {
  ElMessageBox.confirm("你真的要删除吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      goodsStore.deleteGoods(id);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除!",
      });
    });
};

onMounted(() => {
  goodsStore.getGoods();
});
</script>

<style lang="scss" scoped></style>
