<template>
  <!-- 表格区域 -->
  <el-table :data="orderStore.orderList" border style="width: 100%">
    <el-table-column type="index" label="#" width="60" />
    <el-table-column prop="order_number" label="订单编号" width="200" />
    <el-table-column prop="order_price" label="订单价格" width="120" />
    <el-table-column prop="email" label="是否付款" width="80">
      <template v-slot:default="{ row }">
        <el-tag v-if="row.pay_status == 0" class="mx-1" size="large" type="danger">未付款</el-tag>
        <el-tag v-else class="mx-1" size="large" type="success">付款了</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="is_send" label="是否改变" />
    <el-table-column prop="role_name" label="下单时间">
      <template v-slot:default="{ row }">{{ dayjs(row.create_time).format("YYYY-MM-DD HH:mm:ss") }}</template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="160">
      <template v-slot:default="{ row, index }">
        <el-button type="primary" :icon="Edit" @click="modifyOrder" />
        <el-button type="success" :icon="Location" @click="showLogistics" />
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加用户对话框区域
     -->
</template>

<script setup>
import dayjs from "dayjs";
import { Edit, Location } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useOrderStore } from "@/store/order.js";

const orderStore = useOrderStore();

const modifyOrder = row => {
  orderStore.dialogVisible = true;
  // 对数据进行深拷贝
  //   usersStore.addForm = { ...row };
};

// const setRole = row => {
//   rightsStore;

//   usersStore.setRolesDialogVisible = true;
//   // 发送请求获取角色列表
//   rightsStore.getRolesList();
//   // 拿到所要分配的当前用户
//   Object.assign(usersStore.curUser, row);
// };

const showLogistics = () => {
  orderStore.logisticsVisible = true;
};

onMounted(() => {
  orderStore.getOrderList();
});
</script>

<style lang="scss" scoped></style>
