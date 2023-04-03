<template>
  <!-- 分配角色对话框 -->
  <el-dialog @close="curRoleId = '请选择角色'" v-model="usersStore.setRolesDialogVisible" title="分配角色">
    <p><span>当前的用户：</span>{{ usersStore.curUser.username }}</p>
    <p><span>当前的角色：</span>{{ usersStore.curUser.role_name }}</p>
    <el-select v-model="curRoleId" class="m-2" placeholder="Select" size="large">
      <el-option v-for="item in rightsStore.rolesList" :key="item.id" :label="item.roleName" :value="item.id" />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="usersStore.setRolesDialogVisible = false">取消分配</el-button>
        <el-button type="primary" @click="confirm"> 确认分配 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useUserInfoStore } from "@/store/users.js";
import { useRightsStore } from "@/store/rights.js";
import { ref } from "vue";
const usersStore = useUserInfoStore();
const rightsStore = useRightsStore();

const curRoleId = ref("请选择角色");

const confirm = () => {
  usersStore.setRolesDialogVisible = false;
  usersStore.setRolesByUserIdOrRoleId(curRoleId.value);
  curRoleId.value = "请选择角色";
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 15px;
  font-size: 20px;
  span {
    font-size: 25px;
    font-weight: 400;
  }
}
.el-select {
  margin-top: 20px;
}
</style>
