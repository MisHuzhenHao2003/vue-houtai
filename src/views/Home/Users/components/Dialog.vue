<template>
  <!-- 添加用户对话框区域 -->
  <el-dialog @close="closeHandler" v-model="usersStore.dialogVisible" :title="usersStore.isAdd ? '添加用户' : '修改用户'" width="50%">
    <span>
      <el-form ref="ruleFormRef" :model="usersStore.addForm" status-icon :rules="addFormRules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="usersStore.addForm.username" autocomplete="off" :disabled="!usersStore.isAdd" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="usersStore.isAdd">
          <el-input v-model="usersStore.addForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="usersStore.addForm.email" type="email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="usersStore.addForm.mobile" autocomplete="off" />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="usersStore.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改用户对话框区域 -->
</template>

<script setup>
import { useUserInfoStore } from "@/store/users.js";
import { reactive, ref } from "vue";
import { reqAddUser } from "@/utils/api";
import { ElMessage } from "element-plus";

const usersStore = useUserInfoStore();

const ruleFormRef = ref(null);

// 邮箱的自定义校验规则
const validateEmail = (rule, value, callback) => {
  let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (regEmail.test(value)) callback();
  else callback(new Error("邮箱格式不和法"));
};
// 手机号码的自定义校验规则
const validateMobile = (rule, value, callback) => {
  let regMobile = /^(?:(?:\+|00)86)?1\d{10}$/;
  if (regMobile.test(value)) callback();
  else callback(new Error("手机号码格式不和法"));
};
// 取消
const closeHandler = () => {
  ruleFormRef.value.resetFields();
};
// 确认
const confirm = () => {
  ruleFormRef.value.validate(valid => {
    if (!valid) return;
    if (usersStore.isAdd) {
      // 发送添加用户的请求
      usersStore.addUser();
    } else {
      // 发送修改用户的请求
      usersStore.updateUserInfoById();
    }
    usersStore.dialogVisible = false;
  });
};
//   表单的验证规则
const addFormRules = reactive({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "请输入1-10位的用户名", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 11, message: "请输入3-11位的密码", trigger: "blur" },
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { validator: validateEmail, trigger: "blur" },
  ],
  mobile: [
    { required: true, message: "手机号码不能为空", trigger: "blur" },
    { validator: validateMobile, trigger: "blur" },
  ],
});
</script>

<style lang="scss" scoped></style>
