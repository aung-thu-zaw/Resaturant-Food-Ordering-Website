<script setup>
import { usePaymentStore } from '@/stores/restaurant/payment'

const props = defineProps({ totalAmount: [Number, String] })

const store = usePaymentStore()

const handleCashOnDelivery = async () => await store.cashOnDelivery(props?.totalAmount)
</script>

<template>
  <div class="flex flex-col items-center justify-center p-16">
    <h2 class="text-md font-bold text-slate-600">
      You can pay in cash to our courier when you receive the foods at your doorstep.
    </h2>
    <button
      @click="handleCashOnDelivery"
      type="button"
      class="px-5 py-3 text-sm font-bold rounded-md mt-10 mb-5 bg-orange-600 text-white transition-all animate-press"
    >
      <i class="fa-solid fa-handshake"></i>
      Confirm Order
    </button>
  </div>
</template>
