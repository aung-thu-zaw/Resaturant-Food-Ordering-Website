<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const sortBy = ref(route.query.sort ?? 'latest')

watch(
  () => sortBy.value,
  (newSort) => {
    router.push({ query: { ...route.query, sort: newSort } })
  }
)
</script>

<template>
  <div>
    <label for="sort" class="font-bold text-sm text-slate-800"> Sort By : </label>
    <select
      id="menu-sortby"
      class="px-3 py-3 font-semibold text-sm text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
      v-model="sortBy"
    >
      <option selected disabled>Sort By</option>
      <option value="latest" :selected="sortBy === 'latest'">Latest</option>
      <option value="earliest" :selected="sortBy === 'earliest'">Earliest</option>
    </select>
  </div>
</template>
