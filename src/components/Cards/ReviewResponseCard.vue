<script setup>
defineProps({ response: Object })
</script>

<template>
  <div class="pl-14 w-full">
    <div class="w-full flex items-start justify-between">
      <div class="flex items-center space-x-3 mb-3 ml-4">
        <!-- avatar -->
        <span
          class="w-10 h-10 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full ring-2"
        >
          <img
            class="w-full h-full object-cover rounded-full align-middle border-none shadow-lg ring-2 ring-orange-300"
            :src="response?.user?.avatar"
            alt="user-avatar"
          />
        </span>

        <div class="flex flex-col items-start">
          <h3 class="font-bold text-gray-700">{{ response?.user?.name }}</h3>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <p class="font-semibold text-sm text-gray-700">{{ response?.created_at }}</p>
      </div>
    </div>

    <p class="text-sm font-medium text-gray-700 pl-16">
      {{ response?.response }}
    </p>
  </div>
</template>
