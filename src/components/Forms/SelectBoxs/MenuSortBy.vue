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
    class="p-3 py-4 font-semibold text-sm text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
    v-model="sortBy"
  >
    <option selected disabled>Menu Sort By</option>
    <option value="latest" :selected="sortBy === 'latest'">Latest</option>
    <option value="earliest" :selected="sortBy === 'earliest'">Earliest</option>
    <option value="price_low_to_high" :selected="sortBy === 'price_low_to_high'">
      Price Low To High
    </option>
    <option value="price_high_to_low" :selected="sortBy === 'price_high_to_low'">
      Price High To Low
    </option>
    <!-- <option value="popularity" :selected="sortBy === 'popularity'">Popularity</option> -->
  </select>
</template>
