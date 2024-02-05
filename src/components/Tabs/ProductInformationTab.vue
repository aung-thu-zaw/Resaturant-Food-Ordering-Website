<script setup>
import ReviewCard from '@/components/Cards/ReviewCard.vue'
// import ReviewResponseCard from '@/components/Cards/ReviewResponseCard.vue'
import Pagination from '@/components/Paginations/AppPagination.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/restaurant/menu'

defineProps({
  product: Object,
  productReviews: Object
})

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

const goToTab = (tab) => router.push({ query: { tab } })

const handleUpdatedData = (data) => {
  menuStore.$patch({ specificData: data })
  window.scrollTo(0, 600)
}
</script>

<template>
  <div>
    <div class="border border-gray-300 bg-white rounded-md">
      <ul
        class="flex list-none flex-row px-10 border-b border-b-gray-300"
        role="tablist"
        data-te-nav-ref
      >
        <li role="presentation">
          <button
            @click="goToTab('description')"
            type="button"
            class="block border-x-0 px-7 py-6 text-sm font-medium leading-tight"
            :class="{
              'text-orange-500 border-b-2  border-b-orange-500': route.query.tab === 'description',
              'text-slate-700': route.query.tab !== 'description'
            }"
          >
            <i class="fa-solid fa-file-lines mr-2"></i>
            Description
          </button>
        </li>

        <li role="presentation">
          <button
            @click="goToTab('reviews')"
            type="button"
            class="block border-x-0 border-b-2 border-t-0 border-transparent px-7 py-6 text-sm font-medium leading-tight"
            :class="{
              'text-orange-500 border-b-2  border-b-orange-500': route.query.tab === 'reviews',
              'text-slate-700': route.query.tab !== 'reviews'
            }"
          >
            <i class="fa-solid fa-star"></i>
            Reviews
          </button>
        </li>
      </ul>

      <!--Tabs content-->
      <div class="mb-6">
        <div v-if="route.query.tab === 'description'" class="px-10 py-5">
          <p v-html="product?.description"></p>
        </div>

        <div v-if="route.query.tab === 'reviews'" class="px-10 py-5">
          <div v-if="productReviews?.data?.length" class="space-y-5">
            <div
              v-for="productReview in productReviews?.data"
              :key="productReview.id"
              class="border border-gray-200 rounded-md flex flex-col items-center space-y-6 justify-between p-6"
            >
              <!-- Review -->
              <ReviewCard :review="productReview" />

              <hr />

              <!-- Reply -->
              <ReviewResponseCard
                v-show="productReview.product_review_response"
                :response="productReview.product_review_response"
              />
            </div>

            <!-- Pagination -->
            <div class="my-5 py-5">
              <Pagination :data="productReviews" @updatedData="handleUpdatedData" />
            </div>
          </div>
          <div v-else class="py-20 flex items-center w-full">
            <p class="text-center font-bold text-md text-gray-600 w-full">
              <i class="fa-solid fa-file-circle-xmark"></i>
              This product does not have any product reviews.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
