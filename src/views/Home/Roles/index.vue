<template>
  <Dialog></Dialog>
  <SetRightsDialog></SetRightsDialog>
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="addRoles">添加角色</el-button>
      </el-col>
    </el-row>
    <RolesTable></RolesTable>
  </el-card>
</template>

<script setup>
import Dialog from "./components/Dialog.vue";
import SetRightsDialog from "./components/SetRightsDialog.vue";
import RolesTable from "./components/RolesTable.vue";
import { useRightsStore } from "@/store/rights.js";
const rightsStore = useRightsStore();

const addRoles = () => {
  rightsStore.isAddRoles = true;
  rightsStore.dialogVisible = true;
};
</script>

<style lang="scss" scoped></style>
