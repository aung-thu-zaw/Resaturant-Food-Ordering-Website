<script setup>
// import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
</script>

<template>
  <div class="border border-gray-200 bg-white shadow-sm rounded-md mb-5 p-5">
    <span class="font-bold text-orange-600 text-sm my-4"> Coupon code is applied </span>

    <form @submit.prevent="" class="space-y-3">
      <div>
        <InputField type="text" name="coupon-code" placeholder="Enter Coupon Code" />
      </div>

      <button
        type="submit"
        class="px-4 py-3 inline-block text-sm w-full text-center font-semibold text-white bg-orange-600 shadow-sm border border-gray-200 rounded-md hover:bg-orange-700 duration-200"
      >
        Apply
      </button>
    </form>
  </div>
</template>