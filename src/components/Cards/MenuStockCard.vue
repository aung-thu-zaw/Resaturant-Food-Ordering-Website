<script setup>
import SwitchCheckbox from '@/components/Forms/Fields/SwitchCheckbox.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { reactive } from 'vue'
import { useMenuStockStore } from '@/stores/dashboard/menuStock'

const props = defineProps({ product: Object })

const store = useMenuStockStore()

const form = reactive({ qty: props?.product?.qty, is_available: props?.product?.is_available })

const handleUpdateStock = async () => await store.updateStock(form, props?.product?.slug)
</script>

<template>
  <div class="block rounded-md bg-white border border-gray-200 shadow-sm">
    <form @submit.prevent="handleUpdateStock">
      <div class="h-[220px]" data-te-ripple-init data-te-ripple-color="light">
        <img
          class="rounded-t-md w-full h-full object-cover"
          :src="product?.image"
          :alt="product?.name"
        />
      </div>
      <div class="p-5">
        <h5 class="text-md font-bold leading-tight text-slate-900 line-clamp-2 mb-2">
          {{ product?.name }}
        </h5>

        <p class="text-slate-600 text-xs font-semibold mb-6">{{ product?.ingredients }}</p>

        <div class="flex items-center mb-6">
          <p class="font-bold text-sm text-slate-700 min-w-[50px]">Stock :</p>
          <div class="ml-3">
            <input
              type="number"
              class="rounded-md p-2 w-[80px] text-sm text-gray-700 font-medium border border-gray-300 focus:ring-2 transition-all focus:ring-slate-300 focus:border-gray-400 outline-none"
              min="0"
              v-model="form.qty"
            />
          </div>
        </div>

        <div class="flex items-center mb-6">
          <p class="font-bold text-sm text-slate-700">Availability :</p>
          <div class="ml-3">
            <SwitchCheckbox v-model:checked="form.is_available" />
          </div>
        </div>

        <div v-show="can('menu-stocks.edit')" class="w-full">
          <FormButton>
            <i class="fa-solid fa-rotate"></i>
            Update
          </FormButton>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

.scrollbar::-webkit-scrollbar {
  height: 10px;
}
</style>
