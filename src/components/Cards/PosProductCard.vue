<script setup>
import NormalButton from '@/components/Buttons/NormalButton.vue'
</script>

<template>
  <div
    class="group rounded-[5px] bg-white border border-gray-200 shadow-sm text-left flex flex-col items-center justify-start min-h-[400px] overflow-hidden"
  >
    <a
      class="relative w-full h-[220px] overflow-hidden"
      data-te-ripple-init
      data-te-ripple-color="light"
    >
      <img
        class="rounded-t-[5px] w-full h-full object-cover group-hover:scale-110 duration-300 transition-all"
        src="http://localhost:8000/storage/products/espresso-martini.jpeg"
      />
    </a>

    <div class="p-5">
      <a
        class="text-lg font-bold leading-tight text-slate-900 line-clamp-2 mb-2 hover:text-orange-500 duration-150 cursor-pointer"
      >
        Espresso Martini
      </a>

      <p class="text-slate-600 text-xs font-semibold mb-4">
        Espresso, vodka, coffee liqueur, simple syrup, ice
      </p>

      <div class="flex items-center flex-wrap">
        <button
          type="button"
          class="px-2.5 py-2 text-[.7rem] rounded-md font-semibold md:ml-0 ml-3 mb-2 border border-orange-300 text-orange-500 mr-2"
        >
          More ( + 10 $ )
        </button>
        <button
          type="button"
          class="px-2.5 py-2 text-[.7rem] rounded-md font-semibold md:ml-0 ml-3 mb-2 border border-orange-300 text-orange-500 mr-2"
        >
          More Cheese ( + 10 $ )
        </button>
        <button
          type="button"
          class="px-2.5 py-2 text-[.7rem] rounded-md font-semibold md:ml-0 ml-3 mb-2 border border-orange-300 text-orange-500 mr-2"
        >
          More Cheese ( + 10 $ )
        </button>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-lg space-x-3">
          <span class="text-orange-500 font-bold">$ 200</span>
        </div>

        <NormalButton class="font-bold text-white bg-orange-500">
          <i class="fa-solid fa-plus"></i>
        </NormalButton>
      </div>

      <!-- <div v-if="product?.discount_price" class="text-lg space-x-3">
        <span class="text-orange-500 font-bold"
          >$ {{ formatAmount(product?.discount_price) }}</span
        >
        <span class="text-slate-600 line-through text-sm font-medium">
          $ {{ formatAmount(product?.base_price) }}
        </span>
      </div>
      <div v-else class="text-lg space-x-3">
        <span class="text-orange-500 font-bold"
          >$ {{ formatAmount(product?.base_price) }}</span
        >
      </div> -->
    </div>
  </div>
</template>