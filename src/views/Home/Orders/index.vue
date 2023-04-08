<template>
  <ModifyOrderDialog></ModifyOrderDialog>
  <Logistics></Logistics>
  <el-card class="box-card">
    <!-- 添加用户 -->
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content ep-bg-purple" />
        <el-input clearable @clear="searchOrClear" v-model="orderStore.queryInfo.query" placeholder="请输入内容" class="input-with-select">
          <template #append>
            <el-button :icon="Search" @click="searchOrClear" />
          </template>
        </el-input>
      </el-col>
    </el-row>
    <OrderTable></OrderTable>
    <!-- 分页器区域 -->
    <el-pagination
      v-model:current-page="orderStore.queryInfo.pagenum"
      v-model:page-size="orderStore.queryInfo.pagesize"
      :page-sizes="[1, 2, 3, 4]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="orderStore.total"
      @size-change="handleSizeChangeOrCurrentChange"
      @current-change="handleSizeChangeOrCurrentChange"
    />
  </el-card>
</template>

<script setup>
import OrderTable from "./components/OrderTable";
import Logistics from "./components/Logistics.vue";
import ModifyOrderDialog from "./components/ModifyOrderDialog.vue";
import { Search } from "@element-plus/icons-vue";
import { useOrderStore } from "@/store/order.js";
const orderStore = useOrderStore();

// 页数或每页数据发生改变时的回调
function handleSizeChangeOrCurrentChange() {
  orderStore.getOrderList();
}
// 搜索或者清空触发的回调
function searchOrClear() {
  orderStore.getOrderList();
}
// const addUser = () => {
//   usersStore.dialogVisible = true;
//   usersStore.isAdd = true;
// };
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
