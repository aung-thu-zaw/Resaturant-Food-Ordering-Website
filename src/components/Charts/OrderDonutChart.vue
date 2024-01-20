<script setup>
const chartOptions = {
  chart: {
    id: 'vuechart-donut'
  },

  labels: ['Delivered', 'On Delivery', 'Cancelled'],
  colors: ['#4CAF50', '#FFC107', '#FF5722'],

  legend: {
    show: false
  },

  dataLabels: {
    enabled: true,
    style: {
      fontSize: '10px',
      fontWeight: 'bold'
    }
  }
}

const chartSeries = [30, 50, 20]
</script>

<template>
  <div class="border bg-white p-5 rounded-md shadow shadow-gray-200 space-y-10">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-slate-800 text-lg mb-5">Orders Summary</h3>

      <div class="flex">
        <div class="flex bg-gray-200 rounded-md transition p-1">
          <nav class="flex space-x-1">
            <button
              type="button"
              class="py-1.5 px-3.5 inline-flex items-center gap-x-2 text-xs font-bold rounded-md disabled:opacity-50 disabled:pointer-events-none bg-white text-slate-700"
            >
              Today
            </button>
            <button
              type="button"
              class="py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-xs text-gray-500 hover:text-gray-700 font-medium rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            >
              Weekly
            </button>
            <button
              type="button"
              class="py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-xs text-gray-500 hover:text-gray-700 font-medium rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            >
              Monthly
            </button>
          </nav>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-5">
      <div class="border border-gray-200 p-3 rounded-md">
        <h3 class="font-bold text-slate-800 text-xl">25</h3>
        <span class="text-sm font-semibold text-gray-600">On Delivery</span>
      </div>
      <div class="border border-gray-200 p-3 rounded-md">
        <h3 class="font-bold text-slate-800 text-xl">25</h3>
        <span class="text-sm font-semibold text-gray-600">Delivered</span>
      </div>
      <div class="border border-gray-200 p-3 rounded-md">
        <h3 class="font-bold text-slate-800 text-xl">25</h3>
        <span class="text-sm font-semibold text-gray-600">Cancelled</span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="">
        <apexchart :options="chartOptions" :series="chartSeries" type="donut" height="280" />
      </div>
      <div class="w-[210px] space-y-5 pe-5">
        <div class="flex flex-col items-start space-x-2 space-y-3">
          <div
            class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="flex flex-col justify-center rounded-full overflow-hidden bg-[#FFC107] text-xs text-white text-center whitespace-nowrap transition duration-500"
              style="width: 25%"
            />
          </div>

          <div class="text-xs flex items-center justify-between w-full">
            <div>
              <span class="text-[#FFC107]">
                <i class="fa-solid fa-square" />
              </span>
              <span class="font-bold text-gray-600"> On Delivery </span>
            </div>
            <span class="text-slate-800 font-bold">$23,445</span>
          </div>
        </div>
        <div class="flex flex-col items-start space-x-2 space-y-3">
          <div
            class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="flex flex-col justify-center rounded-full overflow-hidden bg-[#4CAF50] text-xs text-white text-center whitespace-nowrap transition duration-500"
              style="width: 25%"
            />
          </div>

          <div class="text-xs flex items-center justify-between w-full">
            <div>
              <span class="text-[#4CAF50]">
                <i class="fa-solid fa-square" />
              </span>
              <span class="font-bold text-gray-600"> Delivered </span>
            </div>
            <span class="text-slate-800 font-bold">$9,45</span>
          </div>
        </div>

        <div class="flex flex-col items-start space-x-2 space-y-3">
          <div
            class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="flex flex-col justify-center rounded-full overflow-hidden bg-[#FF5722] text-xs text-white text-center whitespace-nowrap transition duration-500"
              style="width: 25%"
            />
          </div>

          <div class="text-xs flex items-center justify-between w-full">
            <div>
              <span class="text-[#FF5722]">
                <i class="fa-solid fa-square" />
              </span>
              <span class="font-bold text-gray-600"> Cancelled </span>
            </div>
            <span class="text-slate-800 font-bold">$3,445</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
