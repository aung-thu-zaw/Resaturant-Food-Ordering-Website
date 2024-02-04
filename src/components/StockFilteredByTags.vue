<script setup>
import { useRoute, useRouter } from 'vue-router'

defineProps({
  total: {
    type: Number,
    required: false
  }
})

const route = useRoute()
const router = useRouter()

const handleRemoveCategory = () => router.push({ query: { ...route.query, category: undefined } })

const handleRemoveStock = () => router.push({ query: { ...route.query, stock: undefined } })
</script>

<template>
  <div class="px-2 flex items-center">
    <div v-show="route.query?.stock || route.query?.category" class="flex items-center">
      <p class="font-bold text-blueGray-700 text-sm mr-1">Filtered By :</p>

      <div class="flex items-center space-x-3">
        <div
          v-show="route.query?.category"
          class="inline-flex flex-nowrap items-center bg-white border border-gray-200 rounded-full px-2 py-1.5"
        >
          <div class="whitespace-nowrap text-xs font-bold text-gray-700 capitalize">
            Category : {{ route.query?.category }}
          </div>
          <button
            @click="handleRemoveCategory"
            type="button"
            class="ms-2.5 inline-flex justify-center items-center h-2 w-2 rounded-full text-gray-600 text-xs hover:text-red-600 transition-all cursor-pointer"
          >
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </div>

        <div
          v-show="route.query?.rating"
          class="inline-flex flex-nowrap items-center bg-white border border-gray-200 rounded-full px-2 py-1.5"
        >
          <div class="whitespace-nowrap text-xs font-bold text-gray-700 capitalize">
            Stock : {{ route.query?.stock }}
          </div>
          <button
            @click="handleRemoveStock"
            type="button"
            class="ms-2.5 inline-flex justify-center items-center h-2 w-2 rounded-full text-gray-600 text-xs hover:text-red-600 transition-all cursor-pointer"
          >
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
      </div>
    </div>

    <p v-show="route.query?.search" class="text-sm font-semibold text-orange-600 ml-auto">
      {{ total }} post(s) found for filter result
    </p>
  </div>
</template>
