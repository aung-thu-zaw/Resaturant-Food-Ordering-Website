<script setup>
import StarRating from '@/components/Ratings/StarRating.vue'
import { computed } from 'vue'
import { useFormatFunctions } from '@/Composables/useFormatFunctions'

const props = defineProps({ product: Object })

const { formatAmount } = useFormatFunctions()

const avgRating = computed(() => {
  const rawAvgRating = props.product?.product_reviews_avg_rating

  const avgRatingValue = parseFloat(rawAvgRating)

  if (!Number.isNaN(avgRatingValue)) {
    return avgRatingValue.toFixed(1)
  }

  return null
})
</script>


<template>
  <div
    class="rounded-[5px] bg-white border border-gray-200 shadow-sm text-center flex flex-col items-center justify-start w-[300px] h-[400px]"
  >
    <a href="#!" class="w-full h-[220px]">
      <img
        class="rounded-t-[5px] w-full h-full object-cover"
        :src="product?.image"
        :alt="product?.name"
      />
    </a>

    <div class="p-5">
      <h5
        class="text-lg font-bold leading-tight text-slate-900 line-clamp-2 mb-2 hover:text-orange-500 duration-150"
      >
        {{ product?.name }}
      </h5>

      <p class="text-slate-600 text-xs font-semibold mb-4">
        {{ product?.ingredients }}
      </p>

      <div v-show="avgRating" class="flex items-center justify-center space-x-3 text-sm mb-4">
        <StarRating :rating="avgRating" />
        <span class="font-semibold text-slate-600 text-sm">
          ({{ product?.product_reviews_count }})
        </span>
      </div>

      <div v-if="product?.discount_price" class="text-lg space-x-3">
        <span class="text-orange-500 font-bold">$ {{ formatAmount(product?.discount_price) }}</span>
        <span class="text-slate-600 line-through text-sm font-medium">
          $ {{ formatAmount(product?.base_price) }}
        </span>
      </div>
      <div v-else class="text-lg space-x-3">
        <span class="text-orange-500 font-bold">$ {{ formatAmount(product?.base_price) }}</span>
      </div>
    </div>
  </div>
</template>