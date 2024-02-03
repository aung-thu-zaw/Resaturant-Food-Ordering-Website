<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import WishlistProductCard from '@/components/Cards/WishlistProductCard.vue'
import { useTitle } from '@vueuse/core'
import { useWishlistStore } from '@/stores/restaurant/wishlist'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

useTitle('Wishlists - Restaurant Food Ordering')

const store = useWishlistStore()
const { wishlists } = storeToRefs(store)

onMounted(async () => {
  await store.getAllWishlists()
  window.scrollTo(0, 0)
})
</script>

<template>
  <AppLayout>
    <section class="container min-h-[500px] mx-auto py-8">
      <h1 class="font-bold text-2xl text-purpleDark mt-5 mb-10">
        My Wishlists ({{ wishlists?.length }})
      </h1>

      <div v-if="wishlists?.length" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <WishlistProductCard
          v-for="wishlist in wishlists"
          :key="wishlist?.id"
          :wishlist="wishlist"
          data-aos="fade-in"
          data-aos-duration="1000"
        />
      </div>

      <div v-else class="py-20 flex flex-col items-center space-y-10">
        <h2 class="font-semibold text-md text-center text-gray-600">
          <i class="fas fa-heart"></i>
          <br />
          Add your favorites to wishlists and they will show here.
        </h2>

        <router-link
          :to="{ name: 'menus.index' }"
          class="px-5 py-3 border border-purpleDark text-purpleDark hover:bg-purpleDark hover:text-white duration-200 text-xs animate-press font-semibold rounded-md"
        >
          <i class="fa-solid fa-bowl-food"></i>
          Go To Menu
        </router-link>
      </div>
    </section>
  </AppLayout>
</template>