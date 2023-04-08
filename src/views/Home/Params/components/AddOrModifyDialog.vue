<template>
  <!-- 添加或修改角色对话框区域 -->
  <el-dialog @close="closeHandler" v-model="goodsStore.ParamsDialogVisible" :title="title" width="50%">
    <span>
      <el-form ref="ruleFormRef" :model="goodsStore.goodsParams" status-icon :rules="addFormRules" label-width="120px" class="demo-ruleForm">
        <el-form-item v-if="goodsStore.activeName == 'many'" label="动态参数" prop="manyParams">
          <el-input v-model="goodsStore.goodsParams.manyParams" autocomplete="off" />
        </el-form-item>
        <el-form-item v-else label="静态属性" prop="onlyAttr">
          <el-input v-model="goodsStore.goodsParams.onlyAttr" autocomplete="off" />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="goodsStore.ParamsDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useGoodsStore } from "@/store/goods.js";
import { reactive, ref, computed } from "vue";

const goodsStore = useGoodsStore();

const ruleFormRef = ref(null);

// 关闭
const closeHandler = () => {
  ruleFormRef.value.resetFields();
  goodsStore.goodsParams.manyParams = "";
};
// 确认
const confirm = () => {
  ruleFormRef.value.validate(valid => {
    if (!valid) return;
    if (goodsStore.isAddOrUpdate) goodsStore.updateParams();
    else goodsStore.addManyOrOnlyList();
    goodsStore.ParamsDialogVisible = false;
  });
};
//   表单的验证规则
const addFormRules = reactive({
  manyParams: [
    { required: true, message: "参数名不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "请输入1-10位的参数名", trigger: "blur" },
  ],
  onlyAttr: [
    { required: true, message: "属性名不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "请输入1-10位的属性名", trigger: "blur" },
  ],
});

const title = computed(() => {
  return goodsStore.activeName == "many" ? (goodsStore.isAddOrUpdate ? "修改参数" : "添加参数") : goodsStore.isAddOrUpdate ? "修改属性" : "添加属性";
});
</script>

<style lang="scss" scoped></style>
