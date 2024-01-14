<script setup>
const chartOptions = {
  chart: {
    id: 'vuechart-vertical-bar-customer'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
  },
  colors: ['#4CAF50']
}

const chartSeries = [
  {
    name: 'Total Customers',
    data: [200, 300, 150, 400, 250]
  }
]
</script>

<template>
  <div class="border bg-white p-5 rounded-md shadow shadow-gray-200">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-slate-800 text-lg mb-5">
        Customer Bar Chart
      </h3>
    </div>

    <div class="bar-chart">
      <apexchart
        :options="chartOptions"
        :series="chartSeries"
        type="bar"
        height="300"
      />
    </div>
  </div>
</template>

