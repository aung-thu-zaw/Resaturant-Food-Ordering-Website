<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const sortBy = ref(route.query.sort ?? 'latest')

watch(
  () => sortBy.value,
  (newValue) => {
    router.push({ query: { ...route.query, sort: newValue } })
  }
)
</script>

<template>
  <select
    id="menu-sortby"
    class="p-3 py-3.5 font-semibold text-sm text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
    v-model="sortBy"
  >
    <option selected disabled>Menu Sort By</option>
    <option value="id" :selected="sortBy === id">Latest</option>
    <option value="high_to_low_stock" :selected="sortBy === 'high_to_low_stock'">
      High To Low Stock
    </option>
    <option value="low_to_high_stock" :selected="sortBy === 'low_to_high_stock'">
      Low To High Stock
    </option>
  </select>
</template>