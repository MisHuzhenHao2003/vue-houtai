<template>
  <!-- 每个角色的权限 -->
  <el-row v-for="(r1, index) in rolesRights.children" :key="r1.id" :class="['bdBottom', index == 0 ? 'bdTop' : '    ']">
    <!-- 一级权限 -->
    <el-col :span="5" class="vcenter">
      <el-tag effect="dark" @close="closeHandler(r1.id)"> {{ r1.authName }}</el-tag>
    </el-col>
    <!-- 二、三权限 -->
    <el-col :span="19">
      <el-row v-for="(r2, index) in r1.children" :key="r2.id" :class="[index == 0 ? '' : 'bdTop']" closable>
        <el-col :span="6">
          <el-tag effect="dark" type="success" closable @close="closeHandler(r2.id)"> {{ r2.authName }}</el-tag>
        </el-col>
        <el-col :span="18">
          <el-tag effect="dark" type="warning" v-for="(r3, index) in r2.children" :key="r3.id" closable @close="closeHandler(r3.id)">
            {{ r3.authName }}</el-tag
          >
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import { defineProps } from "vue";
import { useRightsStore } from "@/store/rights.js";
import { ElMessage, ElMessageBox } from "element-plus";

const rightsStore = useRightsStore();

const props = defineProps(["rolesRights"]);

const closeHandler = id => {
  ElMessageBox.confirm("你真的要删除吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      rightsStore.deleteRightsById(props.rolesRights, id);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除!",
      });
    });
};
</script>

<style lang="scss" scoped>
.el-col {
  .el-tag {
    margin: 5px;
  }
}
.bdTop {
  border-top: 1px solid rgba(180, 180, 180, 0.5);
}
.bdBottom {
  border-bottom: 1px solid rgb(180, 180, 180, 0.5);
}
.vcenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
