<script setup>
defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>

<template>
  <select
    id="per-page"
    class="p-3 py-3.5 font-medium text-xs text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
  >
    <option selected disabled>Per Page</option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="25">25</option>
    <option value="50">50</option>
    <option value="75">75</option>
    <option value="100">100</option>
    <option value="150">150</option>
    <option value="200">200</option>
  </select>
</template>
