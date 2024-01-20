<script setup>
import DashboardCardStats from '@/components/Cards/DashboardCardStats.vue'
</script>

<template>
  <div class="px-4 md:px-6 mx-auto w-full py-6">
    <div>
      <!-- Card stats -->
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <DashboardCardStats
            stat-subtitle="Total Menus"
            stat-title="683"
            stat-arrow="up"
            stat-percent="23.45"
            stat-percent-color="text-green-500"
            stat-description="Since last month"
            stat-icon-name="fas fa-bowl-food"
            stat-icon-color="bg-orange-500"
          />
        </div>

        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <DashboardCardStats
            stat-subtitle="Total Orders"
            stat-title="4,982"
            stat-arrow="down"
            stat-percent="23.45"
            stat-percent-color="text-red-500"
            stat-description="Since last month"
            stat-icon-name="fas fa-chart-pie"
            stat-icon-color="bg-emerald-500"
          />
        </div>

        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <DashboardCardStats
            stat-subtitle="Total Revenue"
            stat-title="$56,234"
            stat-arrow="down"
            stat-percent="23.45"
            stat-percent-color="text-red-500"
            stat-description="Since last month"
            stat-icon-name="fas fa-sack-dollar"
            stat-icon-color="bg-yellow-500"
          />
        </div>

        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <DashboardCardStats
            stat-subtitle="Total Customer"
            stat-title="6083"
            stat-arrow="up"
            stat-percent="23.45"
            stat-percent-color="text-green-500"
            stat-description="Since yesterday"
            stat-icon-name="fas fa-users"
            stat-icon-color="bg-blue-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>
