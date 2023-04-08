<template>
  <!-- 分类参数区域 -->
  <AddOrModifyDialog></AddOrModifyDialog>
  <el-card>
    <el-row>
      <el-col>
        <el-alert title="warning alert" type="warning" show-icon />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-cascader v-model="cateKeys" clearable :options="goodsStore.categoriesAll" :props="CascaderProps" @change="handleChange" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs v-model="goodsStore.activeName" class="demo-tabs" @tab-change="handleClick">
          <el-tab-pane label="动态参数" name="many"><ManyTable></ManyTable></el-tab-pane>
          <el-tab-pane label="静态属性" name="only"><OnlyTable></OnlyTable></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import ManyTable from "./components/ManyTable.vue";
import OnlyTable from "./components/OnlyTable.vue";
import AddOrModifyDialog from "./components/AddOrModifyDialog.vue";
import { useGoodsStore } from "@/store/goods.js";
import { reactive, ref, onMounted } from "vue";

const goodsStore = useGoodsStore();

const ruleFormRef = ref(null);

const cateKeys = ref([]);

const CascaderProps = reactive({
  expandTrigger: "click",
  value: "cat_id",
  label: "cat_name",
  children: "children",
});

const handleChange = () => {
  if (cateKeys.value == null) {
    cateKeys.value = [];
    goodsStore.cateKeys = [];
    goodsStore.manyTableData = [];
    goodsStore.onlyTableData = [];
  }
  if (cateKeys.value.length != 3) return (goodsStore.isDisable = true);
  goodsStore.isDisable = false;
  goodsStore.cateKeys = cateKeys.value;
  console.log(cateKeys.value);
  goodsStore.getManyOrOnlyList();
};

const handleClick = () => {
  goodsStore.getManyOrOnlyList();
};

onMounted(() => {
  goodsStore.getCategoriesAll();
});
</script>

<style lang="scss">
.el-row {
  margin: 5px 0;
}
.el-tag {
  margin: 5px 10px;
}
.ml-1 {
  display: inline-block;
  width: 80.6px;
}
</style>
