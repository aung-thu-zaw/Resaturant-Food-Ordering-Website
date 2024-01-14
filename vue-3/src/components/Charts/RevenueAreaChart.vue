<script setup>
const chartOptions = {
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  colors: ['#4CAF50', '#FF5722'],
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  }
}

const chartSeries = [
  {
    name: 'Income',
    data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 80, 60]
  },
  {
    name: 'Expense',
    data: [20, 35, 40, 45, 55, 65, 75, 80, 95, 110, 120, 130]
  }
]
</script>


<template>
  <div class="border bg-white p-5 rounded-md shadow shadow-gray-200 space-y-5">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-slate-800 text-lg">Revenue</h3>

      <div>
        <select
          class="p-2.5 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none outline-none font-semibold text-slate-700 focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
    </div>

    <div class="flex items-center space-x-5 text-xs">
      <div>
        <span class="text-[#4CAF50]">
          <i class="fa-solid fa-square" />
        </span>
        <span class="font-medium text-gray-600">
          Income <span class="text-slate-800 font-bold">$23,445</span>
        </span>
      </div>
      <div>
        <span class="text-[#FF5722]">
          <i class="fa-solid fa-square" />
        </span>
        <span class="font-medium text-gray-600">
          Expense <span class="text-slate-800 font-bold">$23,445</span>
        </span>
      </div>
    </div>

    <div>
      <apexchart :options="chartOptions" :series="chartSeries" type="area" height="350" />
    </div>
  </div>
</template>


