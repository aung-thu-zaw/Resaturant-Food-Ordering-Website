<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
// import DashboardHeaderStats from '@/components/Headers/DashboardHeaderStats.vue'
// import RevenueAreaChart from '@/components/Charts/RevenueAreaChart.vue'
// import OrderDonutChart from '@/components/Charts/OrderDonutChart.vue'
// import CustomerBarChart from '@/components/Charts/CustomerBarChart.vue'
import { useTitle } from '@vueuse/core'

useTitle('Dashboard - Restaurant Food Ordering')
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-6 flex items-center justify-center">
      <h1 class="font-bold text-3xl text-purpleDark">
        <i class="fa-solid fa-home"></i>
        Welcome To Dashboard!
      </h1>
    </div>
    <!-- <template #header>
      <DashboardHeaderStats />
    </template> -->

    <!-- <div class="min-h-screen py-6">
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <div class="w-full">
            <RevenueAreaChart />
          </div>
          <div class="w-full">
            <OrderDonutChart />
          </div>
        </div>
        <div class="w-full mb-12 xl:mb-8 px-4">
          <CustomerBarChart />
        </div>
      </div>
    </div> -->
  </DashboardLayout>
</template>
