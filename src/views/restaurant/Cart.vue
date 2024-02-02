<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { useTitle } from '@vueuse/core'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/restaurant/cart'
import CartItemDataCell from '@/components/Tables/CartItemDataCell.vue'
import OrderSummaryCard from '@/components/Cards/OrderSummaryCard.vue'

useTitle('Cart - Restaurant Food Ordering')

const store = useCartStore()

const { cart } = storeToRefs(store)

onMounted(async () => {
  await store.getCartWithCartItems()
  window.scrollTo(0, 0)
})
</script>

<template>
  <AppLayout>
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <h1 class="font-bold text-4xl text-purpleDark">Shopping Cart</h1>

        <div v-if="cart?.cart_items?.length" data-aos="fade-in" data-aos-duration="1000">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 rounded-md">
                  <table class="min-w-full text-center text-md font-light bg-white overflow-hidden">
                    <thead class="border-b font-bold bg-orange-500 text-white">
                      <tr>
                        <th scope="col" class="border-r px-6 py-4">Image</th>
                        <th scope="col" class="border-r px-6 py-4">Details</th>
                        <th scope="col" class="border-r px-6 py-4">Base Price</th>
                        <th scope="col" class="border-r px-6 py-4">Quantity</th>
                        <th scope="col" class="border-r px-6 py-4">Total</th>
                        <th scope="col" class="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <CartItemDataCell
                        v-for="cartItem in cart?.cart_items"
                        :key="cartItem?.id"
                        :cartItem="cartItem"
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end min-w-[300px] w-[500px] ml-auto">
            <OrderSummaryCard />
          </div>
        </div>

        <div v-else class="py-20 flex flex-col items-center space-y-10">
          <h2 class="font-semibold text-md text-center text-slate-700">
            <i class="fas fa-basket-shopping"></i>
            <br />

            There are no item(s) yet.
          </h2>

          <router-link
            :to="{ name: 'menus.index' }"
            class="px-5 py-3 border border-purpleDark text-purpleDark hover:bg-purpleDark hover:text-white duration-200 text-xs font-semibold rounded-md"
          >
            <i class="fa-solid fa-bowl-food"></i>
            Go Back To Menu
          </router-link>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('../../assets/images/chef-cover.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

.scrollbar::-webkit-scrollbar {
  height: 10px;
}
</style>