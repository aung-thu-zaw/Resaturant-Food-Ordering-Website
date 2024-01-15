<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li class="text-slate-700">
    <div class="flex items-center">
      <i class="fa-solid fa-angle-right text-gray-500"></i>

      <div class="ml-1 text-sm font-semibold text-blueGray-600 hover:text-blueGray-700 md:ml-2">
        {{ label }}
      </div>
    </div>
  </li>
</template>
