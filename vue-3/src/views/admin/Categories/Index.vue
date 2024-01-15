<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import RevenueAreaChart from '@/components/Charts/RevenueAreaChart.vue'
import OrderDonutChart from '@/components/Charts/OrderDonutChart.vue'
import CustomerBarChart from '@/components/Charts/CustomerBarChart.vue'
import { useTitle } from '@vueuse/core'

useTitle('Restaurant Food Ordering')
</script>

<template>
  <DashboardLayout> This is my category. </DashboardLayout>
</template>
