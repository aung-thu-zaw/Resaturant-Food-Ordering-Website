<script setup>
import StarRating from '@/components/Ratings/StarRating.vue'
</script>


<template>
  <div class="block rounded-[5px] bg-white border border-gray-200 shadow-sm text-center">
    <a href="#!">
      <img
        class="rounded-t-[5px] w-full object-contain"
        src="https://html.themefax.com/regfood/images/menu2_img_3.jpg"
        alt=""
      />
    </a>
    <div class="p-5">
      <h5
        class="text-lg font-bold leading-tight text-slate-900 line-clamp-2 mb-2 hover:text-orange-500 duration-150"
      >
        Spicy Burger
      </h5>

      <p class="text-slate-600 text-xs font-semibold mb-4">chicken, egg, mushroom, salad</p>

      <div class="flex items-center justify-center space-x-3 text-sm mb-4">
        <StarRating rating="5" />
        <span class="font-semibold text-slate-600 text-sm">(30)</span>
      </div>

      <div class="text-lg space-x-3">
        <span class="text-orange-500 font-bold">$ 30.00</span>
        <span class="text-slate-600 line-through text-md font-medium">$ 100</span>
      </div>
    </div>
  </div>
</template>