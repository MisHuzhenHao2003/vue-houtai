<template>
  <el-card class="box-card">
    <!-- 分类 -->
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content ep-bg-purple" />
        <el-input clearable @clear="searchOrClear" v-model="goodsStore.queryInfo.query" placeholder="请输入内容" class="input-with-select">
          <template #append>
            <el-button :icon="Search" @click="searchOrClear" />
          </template>
        </el-input>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content ep-bg-purple" />
        <el-button type="primary" @click="todoAddGoods">添加商品</el-button>
      </el-col>
    </el-row>
    <GoodsTable></GoodsTable>
    <!-- 分页器区域 -->
    <el-pagination
      v-model:current-page="goodsStore.queryInfo.pagenum"
      v-model:page-size="goodsStore.queryInfo.pagesize"
      :page-sizes="[1, 2, 3, 4]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsStore.total"
      @size-change="handleSizeChangeOrCurrentChange"
      @current-change="handleSizeChangeOrCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import GoodsTable from "./components/GoodsTable.vue";
import { useGoodsStore } from "@/store/goods.js";
import { useUserInfoStore } from "@/store/users.js";
import { useRouter } from "vue-router";

const router = useRouter();
const goodsStore = useGoodsStore();
const usersStore = useUserInfoStore();

// 页数或每页数据发生改变时的回调;
function handleSizeChangeOrCurrentChange() {
  goodsStore.getGoods();
}
// 搜索或者清空触发的回调
function searchOrClear() {
  goodsStore.getGoods();
}
const todoAddGoods = () => {
  router.push("/home/addGoods");
  usersStore.activeMenus[1] = "商品添加";
  // 长时间放到会话存储里
  sessionStorage.setItem("activeMenus", JSON.stringify(usersStore.activeMenus));
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
