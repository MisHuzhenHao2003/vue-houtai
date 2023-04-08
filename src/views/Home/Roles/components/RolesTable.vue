<template>
  <!-- 表格区域 -->
  <el-table border :data="rightsStore.rolesList" style="width: 100%" row-key="id">
    <el-table-column type="expand" width="60">
      <template v-slot:default="{ row, index }">
        <RightsDetail :rolesRights="row"></RightsDetail>
      </template>
    </el-table-column>
    <el-table-column type="index" label="#" width="60" />
    <el-table-column prop="roleName" label="角色名称" width="180" />
    <el-table-column prop="roleDesc" label="角色描述" />
    <el-table-column label="操作" align="center" width="300px">
      <!-- 通过作用域插槽拿到各行数据 -->
      <template v-slot:default="{ row, index }">
        <el-button size="small" type="primary" @click="modifyRoles(row)" :icon="Edit">编辑</el-button>
        <el-button size="small" type="danger" @click="deleteHandler(row.id)" :icon="Delete">删除</el-button>
        <el-button size="small" type="warning" @click="setRights(row)" :icon="HelpFilled">分配权限</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import RightsDetail from "./RightsDetail.vue";
import { Edit, Delete, HelpFilled } from "@element-plus/icons-vue";
import { useRightsStore } from "@/store/rights.js";
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const rightsStore = useRightsStore();

const modifyRoles = row => {
  rightsStore.dialogVisible = true;
  rightsStore.isAddRoles = false;
  // 对数据进行深拷贝
  Object.assign(rightsStore.addOrModifyData, row);
  console.log(row);
};
const deleteHandler = id => {
  ElMessageBox.confirm("你真的要删除吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      rightsStore.deleteRolesById(id);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除!",
      });
    });
};
// 分配权限
const setRights = row => {
  rightsStore.setRightsDialogVisible = true;

  rightsStore.curRoleId = row.id;

  //   重置勾选的列表
  rightsStore.checkedKeys = [];

  //   把当前角色已有的权限在树形控件中勾选;
  //   用递归找到最后一级权限把id添加到checkedKeys中;
  let Recursion = (node, arr) => {
    // 当没有children属性时表示是最后一级权限
    if (!node.children) return arr.push(node.id);
    node.children.forEach(item => {
      Recursion(item, rightsStore.checkedKeys);
    });
  };
  Recursion(row, rightsStore.checkedKeys);

  rightsStore.getRightsTreeList();
};

onMounted(() => {
  rightsStore.getRolesList();
});
</script>

<style lang="scss" scoped></style>
