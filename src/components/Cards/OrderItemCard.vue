<script setup>
import { computed } from 'vue'

const props = defineProps({ orderItem: Object })

const addons = computed(() => {
  return JSON.parse(props.orderItem?.addons)
})
const formattedAddons = computed(() => {
  if (!addons.value || addons.value.length === 0) return ''

  return addons.value.map((addon) => `${addon.name}`).join(' | ')
})
</script>

<template>
  <div
    class="border border-slate-200 rounded-md flex items-start justify-between space-x-5 p-5 w-full"
  >
    <div class="w-full flex items-start justify-between">
      <div class="flex items-start justify-center w-full">
        <div class="min-w-[100px] overflow-hidden">
          <img
            :src="orderItem?.product?.image"
            :alt="orderItem?.product?.name"
            class="w-20 h-20 object-cover rounded-md"
          />
        </div>
        <div class="space-y-3 max-w-[400px] w-full">
          <div class="flex items-start justify-between w-full">
            <router-link
              :to="{
                name: 'menus.show',
                params: { slug: orderItem?.product?.slug },
                query: { tab: 'description' }
              }"
              class="font-semibold text-md text-slate-700 line-clamp-2 w-full"
            >
              {{ orderItem?.product?.name }}
            </router-link>
            <p class="text-sm font-bold text-slate-700 min-w-[50px] text-left">
              Qty : {{ orderItem?.qty }}
            </p>
          </div>

          <div
            v-show="orderItem?.addons?.length"
            class="flex space-x-1 items-center flex-wrap text-xs font-medium mb-5"
          >
            <span class="text-[.7rem] rounded-md font-semibold text-orange-500">
              {{ formattedAddons }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>