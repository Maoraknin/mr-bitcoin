<template>
  <div class="about main-layout">
    <h1>Stats</h1>
    <ValueChart/>
  </div>
</template>



<script>
import ValueChart from "@/cmps/value-chart.vue";

export default {
  components: {
    ValueChart,
  },
};
</script>