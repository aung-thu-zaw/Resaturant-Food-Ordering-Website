<script setup>
// import { ref, watch } from 'vue'
// import { useRoute, useRouter } from 'vue-router'

// const route = useRoute()
// const router = useRouter()
// const perPage = ref(route.query.per_page ?? 5)

// watch(
//   () => perPage.value,
//   (newValue) => {
//     router.push({ query: { ...route.query, per_page: newValue } })
//   }
// )
</script>

<template>
  <select
    id="filter-by-rating"
    class="p-3 py-[17.5px] font-semibold text-sm text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
  >
    <option selected disabled>Filter By Rating</option>
    <option value="1">1 Star</option>
    <option value="2">2 Star</option>
    <option value="3">3 Star</option>
    <option value="4">4 Star</option>
    <option value="5">5 Star</option>
  </select>
</template>
