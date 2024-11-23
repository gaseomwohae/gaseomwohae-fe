<!-- src/components/Chart.vue -->
<template>
  <div class="chart-container">
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Chart } from 'chart.js/auto';
  import type { LocalVisitor } from '../model/localVisitor.type';
  const myChart = ref<HTMLCanvasElement | null>(null);
  const props = defineProps<{
    localVisitors: LocalVisitor[];
  }>();
  onMounted(() => {
    if (myChart.value) {
      new Chart(myChart.value, {
        type: 'bar',
        data: {
          labels: props.localVisitors.map(visitor => visitor.name),
          datasets: [
            {
              label: '지역 방문자 수',
              data: props.localVisitors.map(visitor => visitor.visitorCount),
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  });
</script>

<style scoped>
  .chart-container {
    position: relative;
    height: 207px;
    width: 520px;
  }
</style>
