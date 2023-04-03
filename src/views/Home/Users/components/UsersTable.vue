<template>
  <!-- 表格区域 -->
  <el-table :data="usersStore.users" border style="width: 100%">
    <el-table-column type="index" label="#" width="60" />
    <el-table-column prop="username" label="姓名" width="180" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="mobile" label="电话" />
    <el-table-column prop="role_name" label="角色" />
    <el-table-column label="状态" width="80">
      <!-- 通过作用域插槽拿到各行数据 -->
      <template v-slot:default="{ row, index }">
        <el-switch
          @change="updateUserState(row)"
          v-model="row.mg_state"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="160">
      <template v-slot:default="{ row, index }">
        <el-button type="primary" :icon="Edit" @click="modifyUser(row)" circle />
        <el-button type="danger" :icon="Delete" @click="deleteHandler(row.id)" circle />
        <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top">
          <el-button type="warning" :icon="HelpFilled" @click="setRole(row)" circle />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加用户对话框区域
   -->
</template>

<script setup>
import { Edit, Delete, HelpFilled } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useUserInfoStore } from "@/store/users.js";
import { useRightsStore } from "@/store/rights.js";
import { ElMessage, ElMessageBox } from "element-plus";

const usersStore = useUserInfoStore();
const rightsStore = useRightsStore();

function updateUserState({ id, mg_state }) {
  usersStore.updateUserState(id, mg_state);
}
const modifyUser = row => {
  usersStore.dialogVisible = true;
  usersStore.isAdd = false;
  // 对数据进行深拷贝
  usersStore.addForm = { ...row };
};
const deleteHandler = id => {
  ElMessageBox.confirm("你真的要删除吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      usersStore.deleteUserById(id);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除!",
      });
    });
};

const setRole = row => {
  usersStore.setRolesDialogVisible = true;
  // 发送请求获取角色列表
  rightsStore.getRolesList();
  // 拿到所要分配的当前用户
  Object.assign(usersStore.curUser, row);
};

onMounted(() => {
  usersStore.getUsers();
});
</script>

<style lang="scss" scoped></style>
