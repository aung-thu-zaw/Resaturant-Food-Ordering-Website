<script setup>
defineProps({ chef: Object })
</script>

<template>
  <div class="text-center bg-white p-5 rounded-xl">
    <img
      class="rounded-xl sm:w-48 sm:h-48 lg:w-60 lg:h-60 mx-auto object-cover"
      :src="chef?.image"
      :alt="chef?.name"
    />
    <div class="mt-2 sm:mt-4">
      <h3 class="text-md font-semibold text-slate-800 lg:text-xl">{{ chef?.name }}</h3>
      <p class="text-sm text-slate-700 font-semibold">{{ chef?.employee_position?.name }}</p>
    </div>
  </div>
</template>
