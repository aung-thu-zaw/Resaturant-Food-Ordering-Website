<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import OrderSummaryCard from '@/components/Cards/OrderSummaryCard.vue'
import Paypal from './Partials/Paypal.vue'
// import Stripe from './Partials/Stripe.vue'
import CashOnDelivery from './Partials/CashOnDelivery.vue'
import { useTitle } from '@vueuse/core'
import { onMounted } from 'vue'
import { useCheckoutStore } from '@/stores/restaurant/checkout'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

useTitle('Payments - Restaurant Food Ordering')

const route = useRoute()
const store = useCheckoutStore()

onMounted(async () => {
  await store.getCheckoutInformation()
  window.scrollTo(0, 0)
})

const { checkoutInformation } = storeToRefs(store)
</script>

<template>
  <AppLayout>
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <h1 class="font-bold text-4xl text-purpleDark">Choose Payment</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div data-aos="fade-right" data-aos-duration="1000" class="col-span-2">
            <div class="py-5 border border-gray-200 bg-white rounded-md p-5">
              <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
                <router-link
                  :to="{ name: 'payments', query: { tab: 'paypal' } }"
                  class="py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 bg-transparent text-sm text-gray-700 font-semibold hover:text-orange-600 rounded-lg"
                  :class="{ 'text-orange-600': route.query?.tab === 'paypal' || !route.query.tab }"
                >
                  Paypal
                </router-link>

                <router-link
                  :to="{ name: 'payments', query: { tab: 'cash-on-delivery' } }"
                  class="py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 bg-transparent text-sm text-gray-700 font-semibold hover:text-orange-600 rounded-lg"
                  :class="{
                    'text-orange-600': route.query?.tab === 'cash-on-delivery'
                  }"
                >
                  Cash on Delivery
                </router-link>
              </nav>

              <div class="mt-3">
                <div v-if="route.query?.tab === 'paypal' || !route.query.tab">
                  <Paypal />
                </div>

                <div v-if="route.query?.tab === 'cash-on-delivery'">
                  <CashOnDelivery />
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-1" data-aos="fade-left" data-aos-duration="1000">
            <OrderSummaryCard :deliveryCost="checkoutInformation?.shipping_cost" />
          </div>
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