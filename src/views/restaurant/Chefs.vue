<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import OurTeamCard from '@/components/Cards/OurTeamCard.vue'
import { useChefStore } from '@/stores/restaurant/chef'
import { storeToRefs } from 'pinia'
import { useTitle } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import axios from 'axios'

useTitle('Chefs - Restaurant Food Ordering')

const landmark = ref(null)
const items = ref(null)
const store = useChefStore()

const { chefs } = storeToRefs(store)

onMounted(async () => {
  await store.getAllChefs()
  observer.observe(landmark.value)
  items.value = chefs.value?.data
  window.scrollTo(0, 0)
})

const loadMoreItem = async () => {
  if (!chefs.value?.next_page_url) return

  const response = await axios.get(chefs.value?.next_page_url)

  if (response.data) items.value = [...items.value, ...response.data.data]

  store.$patch({ data: response?.data })
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
    rootMargin: '0px 0px 150px 0px'
  }
)
</script>

<template>
  <AppLayout>
    <section class="background">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">Meet Our Chefs</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">Chefs</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <OurTeamCard v-for="chef in items" :key="chef.id" :chef="chef" />
        </div>

        <div>
          <p class="text-center text-slate-700 font-medium text-sm">
            You've reached the end of the page.
          </p>
        </div>
      </div>

      <div ref="landmark"></div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('https://www.thechefisonthetable.com/wp-content/uploads/2019/09/restaurant-chef.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>