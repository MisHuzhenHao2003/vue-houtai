<template>
  <el-row>
    <el-col>
      <el-button type="primary" :disabled="goodsStore.isDisable" @click="addAttr">添加属性</el-button>
    </el-col>
  </el-row>
  <el-table :data="goodsStore.onlyTableData" row-key="attr_id">
    <el-table-column type="expand">
      <template v-slot:default="{ row, index }">
        <el-tag type="primary" v-for="(attr_val, index) in row.attr_vals" closable :key="index" @close="handleClose(attr_val, row)">{{
          attr_val
        }}</el-tag>
        <el-input
          v-if="row.inputVisible"
          ref="InputRef"
          v-model="row.inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm(row)"
          @blur="handleInputConfirm(row)"
        />
        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput(row)">+ New Tag</el-button>
      </template>
    </el-table-column>
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column label="属性名称" prop="attr_name"></el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="{ row, index }">
        <el-button type="primary" :icon="Edit" @click="modifyHandler(row.attr_id, row.attr_name)">编辑</el-button>
        <el-button type="danger" :icon="Delete" @click="deleteHandler(row.attr_id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useGoodsStore } from "@/store/goods.js";
import { Delete, Edit } from "@element-plus/icons-vue";
import { nextTick, ref } from "vue";

const goodsStore = useGoodsStore();

const InputRef = ref(null);

const modifyHandler = (attr_id, attr_name) => {
  // 打开对话框
  goodsStore.ParamsDialogVisible = true;
  //   从添加改为修改模式
  goodsStore.isAddOrUpdate = true;
  //   请求所需要的参数
  goodsStore.goodsParams.onlyAttr = attr_name;
  goodsStore.goodsParams.attr_id = attr_id;
};
const deleteHandler = attr_id => {
  goodsStore.goodsParams.attr_id = attr_id;
  goodsStore.deleteParams();
};
// 添加属性
const addAttr = () => {
  goodsStore.ParamsDialogVisible = true;
  goodsStore.isAddOrUpdate = false;
};
const showInput = row => {
  row.inputVisible = true;
  row.inputValue = "";
  nextTick(() => {
    InputRef.value.focus();
  });
};
// 回车或者失去焦点
const handleInputConfirm = row => {
  row.inputVisible = false;
  if (row.inputValue.trim() == "") return;
  row.attr_vals.push(row.inputValue);
  row.inputValue = "";
  goodsStore.putParamsOrAttr(row.cat_id, row.attr_id, {
    attr_name: row.attr_name,
    attr_sel: row.attr_sel,
    attr_vals: row.attr_vals.join(" "),
  });
};
// 删除
const handleClose = (attr_val, row) => {
  row.attr_vals.splice(row.attr_vals.indexOf(attr_val), 1);
  goodsStore.putParamsOrAttr(row.cat_id, row.attr_id, {
    attr_name: row.attr_name,
    attr_sel: row.attr_sel,
    attr_vals: row.attr_vals.join(" "),
  });
};
</script>

<style lang="scss" scoped></style>
