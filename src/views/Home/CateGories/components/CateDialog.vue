<template>
  <!-- 添加或修改角色对话框区域 -->
  <el-dialog @close="closeHandler" v-model="goodsStore.dialogVisible" :title="goodsStore.isAddOrUpdate ? '修改分类' : '添加分类'" width="50%">
    <span>
      <el-form ref="ruleFormRef" :model="goodsStore.addCate" status-icon :rules="addFormRules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="goodsStore.addCate.cat_name" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="!goodsStore.isAddOrUpdate" label="父级分类" prop="roleDesc">
          <el-cascader
            @focus="goodsStore.getParCategories"
            v-model="goodsStore.cateKeys"
            :options="goodsStore.PreCategories"
            :props="cateProps"
            @change="handleChange"
            clearable
          />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="goodsStore.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useGoodsStore } from "@/store/goods.js";
import { reactive, ref } from "vue";

const goodsStore = useGoodsStore();

const ruleFormRef = ref(null);

const cateProps = reactive({
  expandTrigger: "hover",
  value: "cat_id",
  label: "cat_name",
  children: "children",
  checkStrictly: true,
});

// 关闭
const closeHandler = () => {
  ruleFormRef.value.resetFields();
};
// 确认
const confirm = () => {
  ruleFormRef.value.validate(valid => {
    if (!valid) return;
    if (goodsStore.isAddOrUpdate) goodsStore.updateById();
    else goodsStore.addCater();
    goodsStore.dialogVisible = false;
  });
};
//   表单的验证规则
const addFormRules = reactive({
  cat_name: [
    { required: true, message: "分类名称不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "请输入1-10位的角色名称", trigger: "blur" },
  ],
});
</script>

<style lang="scss" scoped></style>
