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
  <div>
    <label for="sort" class="font-bold text-sm text-slate-800"> Sort By : </label>
    <select
      id="menu-sortby"
      class="px-3 py-3.5 font-semibold text-sm text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
    >
      <option selected disabled>Sort By</option>
      <option value="1">Latest</option>
      <option value="2">Earliest</option>
    </select>
  </div>
</template>
