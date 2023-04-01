<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#333333"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    unique-opened
    :router="true"
    :default-active="state.activePath"
  >
    <el-sub-menu :index="item1.id + ''" v-for="(item1, index) in state.menus" :key="item1.id">
      <template #title>
        <i :class="state.icons[index]"></i>
        <span>{{ item1.authName }}</span>
      </template>
      <el-menu-item-group v-for="(item2, index) in item1.children" :key="item2.id">
        <el-menu-item :index="item2.path" @click="saveActivePath(item2.path)">{{ item2.authName }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reqGetMenus } from "@/utils/api";
import { reactive, onMounted } from "vue";

const state = reactive({
  menus: [],
  activePath: "",
  icons: ["iconfont icon-user", "iconfont icon-tijikongjian", "iconfont icon-shangpin", "iconfont icon-danju", "iconfont icon-baobiao"],
});

async function getMenus() {
  let { data: res } = await reqGetMenus();
  if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
  state.menus = res.data;
}

function saveActivePath(path) {
  sessionStorage.setItem("activePath", path);
  state.activePath = sessionStorage.getItem("activePath");
}
onMounted(() => {
  getMenus();
  state.activePath = sessionStorage.getItem("activePath");
});
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
  .el-sub-menu {
    i {
      margin-right: 10px;
    }
  }
}
</style>
