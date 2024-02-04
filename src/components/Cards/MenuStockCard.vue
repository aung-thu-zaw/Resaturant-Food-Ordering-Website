<script setup>
import SwitchCheckbox from '@/components/Forms/Fields/SwitchCheckbox.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
</script>

<template>
  <div class="block rounded-md bg-white border border-gray-200 shadow-sm">
    <a href="#!">
      <img
        class="rounded-t-md"
        src="https://img.freepik.com/premium-photo/burger-food-photography_398492-6506.jpg"
        alt=""
      />
    </a>
    <div class="p-5">
      <h5 class="text-md font-bold leading-tight text-slate-900 line-clamp-2 mb-2">
        Grill Chicken Chop®
      </h5>

      <p class="text-slate-600 text-xs font-semibold mb-6">chicken, egg, mushroom, salad</p>

      <div class="flex items-center mb-6">
        <p class="font-bold text-sm text-slate-700 min-w-[50px]">Stock :</p>
        <div class="ml-3">
          <input
            type="number"
            class="rounded-md p-2 w-[80px] text-sm text-gray-700 font-medium border border-gray-300 focus:ring-2 transition-all focus:ring-slate-300 focus:border-gray-400 outline-none"
            min="0"
          />
        </div>
      </div>

      <div class="flex items-center mb-6">
        <p class="font-bold text-sm text-slate-700">Availability :</p>
        <div class="ml-3">
          <SwitchCheckbox />
        </div>
      </div>

      <div class="w-full">
        <NormalButton class="w-full bg-blue-600 text-white rounded-[4px]">
          <i class="fa-solid fa-rotate"></i>
          Update
        </NormalButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

.scrollbar::-webkit-scrollbar {
  height: 10px;
}
</style>
