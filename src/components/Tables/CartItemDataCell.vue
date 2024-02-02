<script setup>
import { useFormatFunctions } from '@/composables/useFormatFunctions'
import { ref, watch } from 'vue'
import { useCartStore } from '@/stores/restaurant/cart'
import { useCartItemStore } from '@/stores/restaurant/cartItem'

const props = defineProps({ cartItem: Object })

const cartStore = useCartStore()
const cartItemStore = useCartItemStore()
const quantity = ref(props.cartItem?.qty)

const { formatAmount } = useFormatFunctions()

const calculateTotalPrice = () => {
  let totalPrice = 0

  if (props.cartItem?.product) {
    const unitPrice = props.cartItem.product.discount_price ?? props.cartItem.product.base_price

    totalPrice = quantity.value * unitPrice

    if (props.cartItem?.addons?.length > 0 && props.cartItem?.product?.addons?.length > 0) {
      const cartItemAddons = props.cartItem.addons.map((cartItemAddon) => ({
        name: cartItemAddon.name,
        additional_price: parseFloat(cartItemAddon.additional_price)
      }))

      totalPrice += cartItemAddons.reduce((addonTotal, cartItemAddon) => {
        const matchingProductAddon = props.cartItem.product.addons.find(
          (productAddon) => productAddon.name === cartItemAddon.name
        )

        if (matchingProductAddon) {
          addonTotal += cartItemAddon.additional_price * quantity.value
        }

        return addonTotal
      }, 0)
    }

    return totalPrice
  } else {
    return totalPrice
  }
}

const increment = () =>
  quantity.value >= props.cartItem?.product?.qty
    ? (quantity.value = props.cartItem?.product?.qty)
    : quantity.value++

const decrement = () => (quantity.value <= 1 ? 1 : quantity.value--)

watch(quantity, async (newValue) => {
  await cartItemStore.updateCartItem(
    { qty: newValue, total_price: calculateTotalPrice() },
    props.cartItem?.id
  )

  await cartStore.getCartWithCartItems()
})

const handleRemoveItem = async () => {
  const confirmed = window.confirm('Are you sure you want to remove this item from the cart?')

  if (confirmed) {
    await cartItemStore.deleteCartItem(props.cartItem?.id)

    await cartStore.getCartWithCartItems()
  }
}
</script>

<template>
  <tr class="border-b text-center font-bold text-purpleDark">
    <td class="border-r py-4">
      <div class="flex items-center justify-center">
        <img :src="cartItem?.product?.image" class="h-20 object-contain" />
      </div>
    </td>
    <td class="border-r px-6 py-4 space-y-3 text-left">
      <h3 class="hover:text-orange-500 text-lg font-bold">
        {{ cartItem?.product?.name }}
      </h3>
      <div v-show="cartItem?.addons?.length" class="flex flex-col items-start space-y-2">
        <span
          v-for="(addon, index) in cartItem?.addons"
          :key="index"
          class="text-xs text-orange-500"
        >
          {{ addon?.name }} ( + {{ addon?.additional_price }} $ )
        </span>
      </div>
    </td>

    <td class="border-r px-6 py-4">${{ formatAmount(cartItem?.unit_price) }}</td>
    <td class="border-r px-6 py-4">
      <div class="flex items-center justify-center">
        <div class="flex items-center space-x-1.5 border border-gray-300 p-1 rounded-full">
          <button
            @click="increment"
            type="button"
            class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 rounded-full text-xs w-8 h-8 flex items-center justify-center"
          >
            <i class="fa-solid fa-plus text-white"></i>
          </button>

          <input
            type="number"
            v-model="quantity"
            class="w-[50px] border-none font-semibold text-sm text-gray-800 outline-none border text-center bg-transparent"
          />

          <button
            @click="decrement"
            type="button"
            class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 mr-2 rounded-full text-xs w-8 h-8 flex items-center justify-center"
          >
            <i class="fa-solid fa-minus text-white"></i>
          </button>
        </div>
      </div>
    </td>
    <td class="border-r px-6 py-4">${{ formatAmount(cartItem.total_price) }}</td>
    <td class="px-6 py-4">
      <button
        @click="handleRemoveItem"
        class="hover:text-orange-500 duration-150 text-xl font-bold"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </td>
  </tr>
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
