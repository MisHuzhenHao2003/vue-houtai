<template>
  <div class="users-box">
    <BreadCrumb></BreadCrumb>
    <Dialog></Dialog>
    <el-card class="box-card">
      <!-- 添加用户 -->
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content ep-bg-purple" />
          <el-input clearable @clear="searchOrClear" v-model="usersStore.queryInfo.query" placeholder="Please input" class="input-with-select">
            <template #append>
              <el-button :icon="Search" @click="searchOrClear" />
            </template>
          </el-input>
        </el-col>
        <el-col :span="4"
          ><div class="grid-content ep-bg-purple" />
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <UsersTable></UsersTable>
      <!-- 分页器区域 -->
      <el-pagination
        v-model:current-page="usersStore.queryInfo.pagenum"
        v-model:page-size="usersStore.queryInfo.pagesize"
        :page-sizes="[1, 2, 3, 4]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersStore.total"
        @size-change="handleSizeChangeOrCurrentChange"
        @current-change="handleSizeChangeOrCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import UsersTable from "./components/UsersTable.vue";
import Dialog from "./components/Dialog.vue";
import { useUserInfoStore } from "@/store/users.js";
import { reqAddUser } from "../../../utils/api";
const usersStore = useUserInfoStore();

// 页数或每页数据发生改变时的回调
function handleSizeChangeOrCurrentChange() {
  usersStore.getUsers();
}
// 搜索或者清空触发的回调
function searchOrClear() {
  usersStore.getUsers();
}
const addUser = () => {
  usersStore.dialogVisible = true;
  usersStore.isAdd = true;
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
  .el-col {
    margin-bottom: 20px;
  }
  .el-button {
    height: 100%;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
