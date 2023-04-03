<template>
  <!-- 添加或修改角色对话框区域 -->
  <el-dialog @close="closeHandler" v-model="rightsStore.dialogVisible" :title="rightsStore.isAddRoles ? '添加角色' : '修改角色'" width="50%">
    <span>
      <el-form ref="ruleFormRef" :model="rightsStore.addOrModifyData" status-icon :rules="addFormRules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rightsStore.addOrModifyData.roleName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rightsStore.addOrModifyData.roleDesc" autocomplete="off" />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="rightsStore.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useRightsStore } from "@/store/rights.js";
import { reactive, ref } from "vue";

const rightsStore = useRightsStore();

const ruleFormRef = ref(null);

// 关闭
const closeHandler = () => {
  ruleFormRef.value.resetFields();
};
// 确认
const confirm = () => {
  ruleFormRef.value.validate(valid => {
    if (!valid) return;
    if (rightsStore.isAddRoles) {
      // 发送添加用户的请求
      rightsStore.addRoles();
    } else {
      // 发送修改角色的请求
      rightsStore.updateRolesInfoById();
    }
    rightsStore.dialogVisible = false;
  });
};
//   表单的验证规则
const addFormRules = reactive({
  roleName: [
    { required: true, message: "角色名称不能为空", trigger: "blur" },
    { min: 1, max: 15, message: "请输入1-15位的角色名称", trigger: "blur" },
  ],
  roleDesc: [
    { required: true, message: "角色描述不能为空", trigger: "blur" },
    { min: 1, max: 15, message: "请输入1-15位的角色描述", trigger: "blur" },
  ],
});
</script>

<style lang="scss" scoped></style>
