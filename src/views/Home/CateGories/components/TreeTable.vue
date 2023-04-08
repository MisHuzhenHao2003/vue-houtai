<template>
  <!-- 树形表格区域 -->
  <el-table
    :data="goodsStore.categories"
    style="width: 100%; margin-bottom: 20px"
    row-key="cat_id"
    border
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="cat_name" label="分类名称" sortable />
    <el-table-column label="是否有效" sortable>
      <template v-slot:default="{ row, index }">
        <el-icon :size="20" v-if="row.cat_deleted"><CircleClose color="red" /></el-icon>
        <el-icon :size="20" v-else><CircleCheck color="green" /></el-icon>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="排序" sortable>
      <template v-slot:default="{ row, index }">
        <el-tag v-if="row.cat_level == 0">一级</el-tag>
        <el-tag v-else-if="row.cat_level == 1" type="success">二级</el-tag>
        <el-tag v-else type="warning">三级</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" sortable>
      <template v-slot:default="{ row, index }">
        <el-button type="primary" :icon="Edit" @click="modifyHandler(row.cat_id, row.cat_name)">编辑</el-button>
        <el-button type="danger" :icon="Delete" @click="deleteHandler(row.cat_id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="goodsStore.Params.pagenum"
    v-model:page-size="goodsStore.Params.pagesize"
    :page-sizes="[2, 5, 10]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="goodsStore.total"
    @size-change="handlerPageOrSize"
    @current-change="handlerPageOrSize"
  />
</template>

<script setup>
import { onMounted } from "vue";
import { useGoodsStore } from "@/store/goods";
import { CircleCheck, CircleClose, Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

const goodsStore = useGoodsStore();

const handlerPageOrSize = () => {
  goodsStore.getCategories();
};

const deleteHandler = id => {
  ElMessageBox.confirm("你真的要删除吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      goodsStore.deleteCateById(id);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除!",
      });
    });
};

const modifyHandler = (id, cat_name) => {
  goodsStore.isAddOrUpdate = true;
  goodsStore.dialogVisible = true;
  goodsStore.addCate.cat_name = cat_name;
  goodsStore.curCate_id = id;
};

onMounted(() => {
  goodsStore.getCategories();
});
</script>

<style lang="scss" scoped></style>
