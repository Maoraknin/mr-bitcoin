<template>
<div class="chart-container">
  <Bar v-if='chartData.labels' id="my-chart-id" :options="chartOptions" :data="chartData" />
</div>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service.js";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: null,
        datasets: [
          {
            label: "Avarage block size (in MB)",
            backgroundColor: "#f7931a99",
            data: null,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  async created() {
    this.avgs = await bitcoinService.getAvgBlockSize();
    console.log('this.avgs.values:',this.avgs.values)
    this.chartData.labels = this.avgs.values.map(value => {
       const date = new Date(value.x*1000)
       return `${date.getDate() + 1}.${date.getMonth() + 1}` 
        })
    this.chartData.datasets[0].data = this.avgs.values.map(value => value.y)
    console.log('this.chartData:',this.chartData)
  },
};
</script>