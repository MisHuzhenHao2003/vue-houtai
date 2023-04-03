<template>
  <!-- 分配权限对话框 -->
  <el-dialog v-model="rightsStore.setRightsDialogVisible" title="分配权限">
    <el-tree
      ref="soleTreeRef"
      :props="defaultProps"
      node-key="id"
      :default-checked-keys="rightsStore.checkedKeys"
      :load="loadNode"
      :data="rightsStore.rightTreeList"
      show-checkbox
      default-expand-all
      @check-change="handleCheckChange"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="rightsStore.setRightsDialogVisible = false">取消分配</el-button>
        <el-button type="primary" @click="confirm"> 确认分配 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useRightsStore } from "@/store/rights.js";
import { reactive, ref } from "vue";

const rightsStore = useRightsStore();

const soleTreeRef = ref(null);

const defaultProps = reactive({
  label: "authName",
  children: "children",
});

const confirm = () => {
  rightsStore.setRightsDialogVisible = false;

  //   拿到当前勾选半勾选权限id字符串
  let strIds = [...soleTreeRef.value.getCheckedKeys(), ...soleTreeRef.value.getHalfCheckedKeys()].join(",");
  console.log(strIds);

  //   发送请求分配权限
  rightsStore.setRightsByRoleId(strIds);
};
</script>

<style lang="scss" scoped></style>
