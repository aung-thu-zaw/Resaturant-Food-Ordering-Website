<script setup>
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/restaurant/cart'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

const props = defineProps({
  deliveryCost: {
    type: [Number, String],
    required: false,
    default: () => 0
  }
})

const route = useRoute()
const cartStore = useCartStore()
const { formatAmount } = useFormatFunctions()

const { cart } = storeToRefs(cartStore)

const totalCartItems = computed(() => {
  if (cart.value?.cart_items?.length) {
    return cart.value?.cart_items?.reduce((acc, item) => acc + item.qty, 0)
  }
  return 0
})

const calculateTotalItemAmount = computed(() => {
  let totalPrice = 0
  if (cart.value?.cart_items?.length) {
    for (const item of cart.value.cart_items) {
      totalPrice += parseFloat(item.total_price)
    }
  }
  if (Number.isInteger(totalPrice)) {
    return Number(totalPrice.toFixed(0))
  } else {
    return Number(totalPrice.toFixed(2))
  }
})

const calculateTotalAmount = computed(() => {
  let totalPrice = 0

  if (cart.value?.cart_items?.length) {
    for (const item of cart.value.cart_items) {
      totalPrice += parseFloat(item.total_price)
    }
  }

  totalPrice += parseFloat(props.deliveryCost)

  if (Number.isInteger(totalPrice)) {
    return Number(totalPrice.toFixed(0))
  } else {
    return Number(totalPrice.toFixed(2))
  }
})
</script>

<template>
  <div class="border border-gray-200 bg-white shadow-sm rounded-md mb-5 p-5 w-full">
    <h2 class="text-center mb-5 font-bold text-xl text-gray-800">Order Summary</h2>
    <ul class="space-y-3 text-sm font-semibold mb-5">
      <li class="flex justify-between text-gray-700">
        <span>Total Items:</span>
        <span>{{ totalCartItems }} Items</span>
      </li>

      <li class="flex justify-between text-gray-700">
        <span>Total Items Price:</span>
        <span>$ {{ calculateTotalItemAmount }}</span>
      </li>

      <li v-show="deliveryCost" class="flex justify-between text-gray-700">
        <span>Delivery:</span>
        <span>$ {{ formatAmount(deliveryCost) }}</span>
      </li>

      <!-- <li class="flex justify-between text-gray-700">
        <span>Coupon Code:</span>
        <span class="text-yellow-600 text-sm font-bold">
          Global Usage
          <button class="text-gray-700 cursor-pointer hover:text-red-600">
            <i class="fas fa-xmark"></i>
          </button>
        </span>
      </li> -->

      <!-- <li v-show="coupon" class="flex justify-between text-gray-700">
              <span>Coupon Discount:</span>
              <span v-if="coupon?.type === 'fixed'" class="text-gray-700 text-sm font-bold">
                - $ {{ formatAmount(coupon.value) }}
              </span>
              <span
                v-else-if="coupon?.type === 'percentage'"
                class="text-gray-700 text-sm font-bold"
              >
                - % {{ coupon.value }}
              </span>
            </li> -->

      <li class="text-lg font-bold border-t flex justify-between mt-3 pt-3">
        <span>Total Price:</span>
        <span> $ {{ formatAmount(calculateTotalAmount) }}</span>
      </li>
    </ul>

    <div v-show="route.path === '/cart'" class="space-y-3">
      <router-link
        :to="{ name: 'checkout' }"
        class="px-4 py-3 inline-block text-sm w-full text-center font-semibold text-white bg-orange-600 shadow-sm border border-gray-200 rounded-md hover:bg-orange-700 duration-200"
      >
        <i class="fa-solid fa-right-from-bracket"></i>
        Checkout
      </router-link>
    </div>
  </div>
</template>