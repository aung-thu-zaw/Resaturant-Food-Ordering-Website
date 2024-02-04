<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import BlueBadge from '@/components/Badges/BlueBadge.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import OrangeBadge from '@/components/Badges/OrangeBadge.vue'
import RedBadge from '@/components/Badges/RedBadge.vue'
import SlateBadge from '@/components/Badges/SlateBadge.vue'
import OrderItemCard from '@/components/Cards/OrderItemCard.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import { useTitle } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useMyOrderStore } from '@/stores/user/myOrder'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import axios from 'axios'

useTitle('My Orders - Restaurant Food Ordering')

const landmark = ref(null)
const items = ref(null)
const myOrderStore = useMyOrderStore()
const authStore = useAuthStore()

const { orders } = storeToRefs(myOrderStore)

onMounted(async () => {
  await myOrderStore.getAllOrders()
  observer.observe(landmark.value)
  items.value = orders.value?.data
  window.scrollTo(0, 0)
})

const loadMoreItem = async () => {
  if (!orders.value?.next_page_url) return

  await authStore.getAuthenticatedUser()

  const response = await axios.get(orders.value?.next_page_url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    withXSRFToken: true
  })

  if (response.data) items.value = [...items.value, ...response.data.data]

  myOrderStore.$patch({ data: response?.data })
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMoreItem()
      }
    })
  },
  {
    rootMargin: '0px 0px -50px 0px'
  }
)

const handleOrderCancel = async (orderId) => {
  const confirmed = window.confirm('Are you sure you want to cancel this order?')

  if (confirmed) {
    await myOrderStore.cancelOrder(orderId)

    const index = items.value.findIndex((item) => item.id === orderId)

    if (index !== -1) {
      items.value[index].status = 'cancelled'
    }
  }
}

const handleDownloadInvoice = async (orderId) => await myOrderStore.downloadOrderInvoice(orderId)
</script>

<template>
  <AppLayout>
    <section class="container mx-auto py-8">
      <h1 class="font-bold text-2xl text-purpleDark mt-5 mb-10">My Orders</h1>

      <div>
        <div v-if="items?.length" class="space-y-10">
          <div v-for="order in items" :key="order" class="border p-6 rounded-md space-y-5">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-start space-x-5">
                <div>
                  <h3 class="font-bold text-md text-slate-800">
                    Order No - <span class="text-orange-600">{{ order?.order_no }}</span>
                  </h3>
                  <p class="text-xs text-slate-500 font-medium">
                    Placed on {{ order?.created_at }}
                  </p>
                </div>

                <div>
                  <BlueBadge v-show="order?.status === 'pending'">
                    <i class="fa-solid fa-spinner animate-spin"></i>
                    {{ order?.status }}
                  </BlueBadge>
                  <GreenBadge v-show="order?.status === 'confirmed'">
                    <i class="fa-solid fa-circle-check animate-pulse"></i>
                    {{ order?.status }}
                  </GreenBadge>
                  <OrangeBadge v-show="order?.status === 'on_delivery'">
                    <i class="fa-solid fa-fast-truck animate-pulse"></i>
                    {{ order?.status }}
                  </OrangeBadge>
                  <SlateBadge v-show="order?.status === 'delivered'">
                    <i class="fa-solid fa-truck-ramp-box animate-pulse"></i>
                    {{ order?.status }}
                  </SlateBadge>
                  <RedBadge v-show="order?.status === 'cancelled'">
                    <i class="fa-solid fa-circle-xmark animate-pulse"></i>
                    {{ order?.status }}
                  </RedBadge>
                </div>
              </div>
              <div>
                <NormalButton
                  @click="handleOrderCancel(order?.id)"
                  v-show="order?.status === 'pending'"
                  class="bg-red-600 text-white"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                  Cancel Order
                </NormalButton>
                <NormalButton
                  @click="handleDownloadInvoice(order?.id)"
                  v-show="order?.status === 'delivered'"
                  class="bg-orange-600 text-white"
                >
                  <i class="fa-solid fa-download"></i>
                  Download Invoice
                </NormalButton>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <OrderItemCard
                v-for="orderItem in order?.order_items"
                :key="orderItem?.id"
                :orderItem="orderItem"
              />
            </div>
          </div>

          <div>
            <p class="text-center text-slate-700 font-medium text-sm">
              You've reached the end of the page.
            </p>
          </div>
        </div>
        <div v-else class="py-20 flex flex-col items-center space-y-10">
          <h2 class="font-semibold text-md text-center text-slate-700">
            <i class="fas fa-basket-shopping"></i>
            <br />

            There are no order(s) yet.
          </h2>

          <router-link
            :to="{ name: 'menus.index' }"
            class="px-5 py-3 border border-purpleDark animate-press bg-purpleDark text-white duration-200 text-xs font-semibold rounded-md"
          >
            <i class="fa-solid fa-bowl-food"></i>
            Go To Menu
          </router-link>
        </div>
      </div>
      <div ref="landmark"></div>
    </section>
  </AppLayout>
</template>