<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import OrderSummaryCard from '@/components/Cards/OrderSummaryCard.vue'
import { useTitle } from '@vueuse/core'
import { onMounted } from 'vue'
import { useCheckoutStore } from '@/stores/restaurant/checkout'
import { storeToRefs } from 'pinia'

useTitle('Payments - Restaurant Food Ordering')

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
            <div
              class="flex md:flex-row flex-col items-center space-y-5 md:space-y-0 md:space-x-10"
            >
              <button class="border rounded-md overflow-hidden hover:scale-105 duration-200">
                <img
                  src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
                  alt="paypal"
                  class="w-48 h-24 object-cover"
                />
              </button>

              <button
                class="border border-gray-200 rounded-md overflow-hidden hover:scale-105 duration-200"
              >
                <img
                  src="https://www.spuerkeess.lu/fileadmin/_processed_/9/b/csm_3_Cartes_800X450_a83ae13af0.png"
                  alt="credit"
                  class="w-48 h-24 object-cover"
                />
              </button>

              <button
                class="border border-gray-200 rounded-md overflow-hidden hover:scale-105 duration-200"
              >
                <img
                  src="https://www.shutterstock.com/image-vector/cash-on-delivery-tags-collection-600nw-1537188653.jpg"
                  alt="cod"
                  class="w-48 h-24 object-cover"
                />
              </button>
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