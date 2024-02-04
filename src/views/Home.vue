<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const leftRef = ref(null);

onMounted(() => {
  let myChart = echarts.init(leftRef.value);
  let option = {
    xAxis: {
      type: "category",
      data: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  myChart.setOption(option);
});


</script>

<template>
  <div class="home">
    <div ref="leftRef" class="left">
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  z-index: 2;
  position: absolute;
}
.left {
  width: 500px;
  height: 500px;
  background-color: rgba(133, 133, 133, 0.5);
  pointer-events: auto;
}
</style>
