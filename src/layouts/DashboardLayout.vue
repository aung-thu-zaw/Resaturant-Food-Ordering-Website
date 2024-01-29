<script setup>
import DashboardNavbar from '@/components/Navbars/DashboardNavbar.vue'
import DashboardSidebar from '@/components/Sidebars/DashboardSidebar.vue'
import { Dropdown, Ripple, Sidenav, Carousel, Select, initTE } from 'tw-elements'
import { onMounted } from 'vue'
import { useAbilityStore } from '@/stores/dashboard/ability.js'

const abilityStore = useAbilityStore()

onMounted(async () => {
  initTE({ Dropdown, Ripple, Sidenav, Carousel, Select })

  await abilityStore.getAllAbilities()
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

<style>
:root {
  --dp-font-family: roboto;
  --dp-border-radius: 6px;
  --dp-input-padding: 15px;
  --dp-font-size: 0.875rem;
  --dp-preview-font-size: 0.8rem;
  --dp-time-font-size: 0.8rem;
}

.dp__theme_light {
  --dp-background-color: #f9fafb;
  --dp-text-color: rgb(31 41 55);
  --dp-border-color: rgb(209 213 219);
  --dp-menu-border-color: rgb(209 213 219);
}

.input-slot-image {
  width: auto;
  margin-left: 5px;
}
</style>
