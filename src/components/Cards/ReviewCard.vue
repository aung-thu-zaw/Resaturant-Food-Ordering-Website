<script setup>
import StarRating from '@/components/Ratings/StarRating.vue'

defineProps({ review: Object })
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3 ml-4">
        <!-- avatar -->
        <span
          class="w-10 h-10 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full ring-2"
        >
          <img
            class="w-full h-full object-cover rounded-full align-middle border-none shadow-lg ring-2 ring-orange-300"
            :src="review?.reviewer?.avatar"
            alt="user-photo"
          />
        </span>

        <h3 class="font-bold text-gray-700 text-md">{{ review?.reviewer?.name }}</h3>
      </div>

      <div class="flex items-center space-x-2">
        <p class="font-semibold text-sm text-gray-700">
          {{ review?.created_at }}
        </p>
      </div>
    </div>

    <div class="pl-16 space-y-3 w-full">
      <!-- Rating -->

      <StarRating :rating="review?.rating" />

      <p class="text-sm font-medium text-gray-700">
        {{ review?.comment }}
      </p>
    </div>
  </div>
</template>
