<template>
  <!-- 图表区域 -->
  <el-card>
    <div id="main"></div>
  </el-card>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { reqGetReportsData } from "@/utils/api";
import { ElMessage } from "element-plus";

const option = ref({
  title: {
    text: "用户来源",
  },
  tooltip: {},
  xAxis: {
    type: "category",
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "销量",
      type: "line",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
});

// 获取报表数据
const getReportsData = async () => {
  let { data: res } = await reqGetReportsData();
  if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
  option.value = { ...option.value, ...res.data };
};

function initChart() {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("main"), null, {
    width: 750,
    height: 400,
  });
  // 绘制图表
  myChart.setOption(option.value);
}
onMounted(() => {
  getReportsData();
  //   因为请求是异步的,所以要等一会二
  setTimeout(() => {
    initChart();
  }, 100);
});
</script>

<style lang="scss" scoped></style>
