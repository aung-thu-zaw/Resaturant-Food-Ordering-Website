<script setup>
import StarRating from '@/components/Ratings/StarRating.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import { useFormatFunctions } from '@/Composables/useFormatFunctions'
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/restaurant/wishlist'

const props = defineProps({ wishlist: Object })

const wishlistStore = useWishlistStore()
const { formatAmount } = useFormatFunctions()

const avgRating = computed(() => {
  const rawAvgRating = props.wishlist?.product?.product_reviews_avg_rating

  const avgRatingValue = parseFloat(rawAvgRating)

  if (!Number.isNaN(avgRatingValue)) {
    return avgRatingValue.toFixed(1)
  }

  return null
})

const discountPercentage = computed(() => {
  const discountPercentage =
    ((props.wishlist?.product?.base_price - props.wishlist?.product?.discount_price) /
      props.wishlist?.product?.base_price) *
    100

  return Math.round(discountPercentage)
})

const handleRemove = async () => {
  const confirmed = window.confirm('Are you sure you want to remove this item?')

  if (confirmed) {
    await wishlistStore.deleteWishlist(props.wishlist?.id)
    await wishlistStore.getAllWishlists()
  }
}
</script>

<template>
  <div
    class="group rounded-[5px] bg-white border border-gray-200 shadow-sm text-left flex items-start justify-start overflow-hidden h-[235px]"
  >
    <router-link
      :to="{
        name: 'menus.show',
        params: { slug: wishlist?.product?.slug },
        query: { tab: 'description' }
      }"
      class="relative w-[450px] h-full overflow-hidden"
      data-te-ripple-init
      data-te-ripple-color="light"
    >
      <img
        class="rounded-l-[5px] w-full h-full object-cover group-hover:scale-110 duration-300 transition-all"
        :src="wishlist?.product?.image"
        :alt="wishlist?.product?.name"
      />

      <span
        v-show="wishlist?.product?.discount_price"
        class="absolute top-0 start-0 rounded-ts-[5px] rounded-ee-xl text-xs font-medium bg-orange-500 text-white py-1.5 px-3"
      >
        {{ discountPercentage }}% OFF
      </span>
    </router-link>

    <div class="flex flex-col items-start justify-between h-full p-5 space-y-5 w-full">
      <div class="w-full">
        <router-link
          :to="{
            name: 'menus.show',
            params: { slug: wishlist?.product?.slug },
            query: { tab: 'description' }
          }"
          class="text-lg font-bold leading-tight text-slate-900 line-clamp-2 hover:text-orange-500 duration-150 cursor-pointer w-full mb-2"
        >
          {{ wishlist?.product?.name }}
        </router-link>

        <p class="text-slate-600 text-xs font-semibold mb-4">
          {{ wishlist?.product?.ingredients }}
        </p>

        <div v-show="avgRating" class="flex items-center justify-start space-x-3 text-sm mb-4">
          <StarRating :rating="avgRating" />
          <span class="font-semibold text-slate-600 text-sm">
            ({{ wishlist?.product?.product_reviews_count }})
          </span>
        </div>

        <div v-if="wishlist?.product?.discount_price" class="text-lg space-x-3">
          <span class="text-orange-500 font-bold">
            $ {{ formatAmount(wishlist?.product?.discount_price) }}
          </span>
          <span class="text-slate-600 line-through text-sm font-medium">
            $ {{ formatAmount(wishlist?.product?.base_price) }}
          </span>
        </div>
        <div v-else class="text-lg space-x-3">
          <span class="text-orange-500 font-bold">
            $ {{ formatAmount(wishlist?.product?.base_price) }}
          </span>
        </div>
      </div>
      <div>
        <NormalButton @click="handleRemove" class="bg-purpleDark text-white">
          <i class="fa-solid fa-circle-xmark"></i>
          Remove
        </NormalButton>
      </div>
    </div>
  </div>
</template>