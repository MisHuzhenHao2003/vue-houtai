<template>
  <!--修改地址对话框区域 -->
  <el-dialog @close="closeHandler" v-model="orderStore.dialogVisible" title="修改地址" width="50%">
    <span>
      <el-form ref="ruleFormRef" :model="ModifyData" status-icon :rules="addFormRules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="省市区/县" prop="city">
          <el-cascader v-model="city" :options="cityData" :props="cityProps" @change="handleChange" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="ModifyData.address" autocomplete="off" />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="orderStore.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useOrderStore } from "@/store/order.js";
import { reactive, ref } from "vue";
import cityData from "../citydata.js";

const orderStore = useOrderStore();

const ruleFormRef = ref(null);

const ModifyData = reactive({
  city: [],
  address: "",
});

const cityProps = reactive({
  expandTrigger: "click",
  label: "label",
  value: "value",
});

// 关闭
// const closeHandler = () => {
//   ruleFormRef.value.resetFields();
// };
// 确认
// const confirm = () => {
//   ruleFormRef.value.validate(valid => {
//     if (!valid) return;
//     if (rightsStore.isAddRoles) {
//       // 发送添加用户的请求
//       rightsStore.addRoles();
//     } else {
//       // 发送修改角色的请求
//       rightsStore.updateRolesInfoById();
//     }
//     rightsStore.dialogVisible = false;
//   });
// };
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
