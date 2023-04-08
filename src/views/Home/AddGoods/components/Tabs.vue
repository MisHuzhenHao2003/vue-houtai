<template>
  <el-form :model="addGoods" status-icon :rules="addFormRules" class="demo-ruleForm" label-position="top">
    <el-tabs :before-leave="beforeLeave" v-model="goodsStore.activeIndex" tab-position="left" class="demo-tabs">
      <el-tab-pane label="基本信息" name="0">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input type="text" v-model="addGoods.goods_name" />
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input type="number" v-model="addGoods.goods_price" />
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input type="number" v-model="addGoods.goods_weight" />
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input type="number" v-model="addGoods.goods_number" />
        </el-form-item>
        <el-form-item label="商品分类" prop="goods_cat">
          <el-cascader v-model="addGoods.goods_cat" clearable :options="goodsStore.categoriesAll" :props="CascaderProps" @change="handleChange" />
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">
        <el-form-item v-for="(item, index) in goodsStore.manyTableData" :label="item.attr_name">
          <el-checkbox-group v-model="item.attr_vals" size="small">
            <el-checkbox v-for="(attr_val, index) in item.attr_vals" :label="attr_val" border />
          </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="2">
        <el-form-item v-for="(item, index) in goodsStore.onlyTableData" :label="item.attr_name">
          <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <!-- 上传 图片 -->
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          :drag="true"
          action="http://127.0.0.1:8888/api/private/v1/upload"
          :on-remove="handleRemove"
          :on-success="upLoadSuccessHandler"
          list-type="picture"
          :headers="{ Authorization: goodsStore.token }"
        >
          <el-button type="primary">上传图片</el-button>
          <template #tip>
            <div class="el-upload__tip"></div>
          </template>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="default" />
        <Editor
          style="height: 300px; overflow-y: hidden"
          v-model="addGoods.goods_introduce"
          :defaultConfig="editorConfig"
          mode="default"
          @onCreated="handleCreated"
        />
        <el-button type="primary" @click="addGoodsHandler">添加商品</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script setup>
// 富文本样式
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

// 富文本组件
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

import { useGoodsStore } from "@/store/goods";
import { reactive, onMounted, onBeforeUnmount, ref, shallowRef } from "vue";
import { ElMessage } from "element-plus";

const goodsStore = useGoodsStore();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 添加商品所需要的参数
const addGoods = reactive({
  goods_name: "",
  goods_cat: [],
  goods_price: 0,
  goods_number: 0,
  goods_weight: 0,
  goods_introduce: "",
  pics: [],
  attrs: [],
});
// 级联所需的配置
const CascaderProps = {
  expandTrigger: "click",
  value: "cat_id",
  label: "cat_name",
  children: "children",
};
//   表单的验证规则
const addFormRules = reactive({
  goods_name: [
    { required: true, message: "商品名称不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "请输入1-10位的用户名", trigger: "blur" },
  ],
  goods_price: [{ required: true, message: "商品价格不能为空", trigger: "blur" }],
  goods_weight: [{ required: true, message: "商品重量不能为空", trigger: "blur" }],
  goods_number: [{ required: true, message: "商品数量不能为空", trigger: "blur" }],
  goods_cat: [{ required: true, message: "商品分类不能为空", trigger: "blur" }],
});

const beforeLeave = (activeName, oldActiveName) => {
  if (oldActiveName == "0" && addGoods.goods_cat.length != 3) {
    ElMessage({ message: "请选择商品分类", showClose: true, type: "error" });
    return false;
  }
  switch (activeName) {
    // 动态参数
    case "1":
      (() => {
        goodsStore.activeName = "many";
        goodsStore.cateKeys = addGoods.goods_cat;
        goodsStore.getManyOrOnlyList();
      })();
      break;
    //   静态属性
    case "2":
      (() => {
        goodsStore.activeName = "only";
        goodsStore.cateKeys = addGoods.goods_cat;
        goodsStore.getManyOrOnlyList();
      })();
      break;
  }
};

// 图片上传成功的回调
const upLoadSuccessHandler = response => {
  const obj = { pic: response.data.tmp_path };
  //   存储上传图片的临时地址
  addGoods.pics.push(obj);
};

const handleRemove = ({ response }) => {
  let removePicTmb_path = response.data.tmp_path;
  addGoods.pics = addGoods.pics.filter(item => item.pic != removePicTmb_path);
};
// 添加商品
const addGoodsHandler = () => {
  addGoods.attrs = [];
  // 动态参数
  goodsStore.manyTableData.forEach(item => {
    let obj = { attr_id: item.attr_id, attr_value: item.attr_vals.join(" ") };
    addGoods.attrs.push(obj);
  });

  //   静态属性
  goodsStore.onlyTableData.forEach(item => {
    let obj = { attr_id: item.attr_id, attr_value: item.attr_vals.join(" ") };
    addGoods.attrs.push(obj);
  });
  goodsStore.addGoods({ ...addGoods, goods_cat: addGoods.goods_cat.join(",") });
};
onMounted(() => {
  goodsStore.getCategoriesAll();
});
</script>

<style lang="scss" scoped></style>
