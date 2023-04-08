<template>
  <el-card>
    <el-alert title="添加商品" type="info" center show-icon />
    <el-steps :active="goodsStore.activeIndex - 0" align-center>
      <el-step v-for="(item, index) in stepData" :key="index" :title="item" />
    </el-steps>
    <Tabs></Tabs>
  </el-card>
</template>

<script setup>
import Tabs from "./components/Tabs.vue";
import { useGoodsStore } from "@/store/goods";
import { reactive } from "vue";

const goodsStore = useGoodsStore();

const stepData = reactive(["基本信息", "商品参数", "商品属性", "商品图片", "商品内容", "完成"]);
</script>

<style lang="scss" scoped>
.el-steps {
  margin: 20px 0;
}
</style>
