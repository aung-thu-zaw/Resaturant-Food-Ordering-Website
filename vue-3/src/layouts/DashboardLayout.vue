<script setup>
import DashboardNavbar from '@/components/Navbars/DashboardNavbar.vue'
import DashboardSidebar from '@/components/Sidebars/DashboardSidebar.vue'
import { Dropdown, Ripple, initTE } from 'tw-elements'
import { onMounted } from 'vue'

onMounted(() => {
  initTE({ Dropdown, Ripple })
})
</script>

<template>
  <div class="bg-gray-50 font-roboto">
    <DashboardSidebar />
    <div class="relative md:ml-64">
      <DashboardNavbar />
      <slot name="header" />

      <div class="px-4 md:px-6 mx-auto w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
