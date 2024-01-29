<script setup>
defineProps({ blog: Object, response: Object })
</script>

<template>
  <div class="p-4 pl-16">
    <div class="flex items-start justify-between">
      <div class="flex items-start mb-2">
        <img
          :src="response.user?.avatar"
          :alt="response.user.name"
          class="w-10 h-10 object-cover rounded-full mr-2"
        />

        <div class="flex flex-col items-start">
          <h3 class="font-bold text-slate-700">
            {{ response.user?.name }}
          </h3>
        </div>
      </div>

      <p class="text-slate-600 text-sm font-medium">
        {{ response.created_at }}
      </p>
    </div>

    <div class="pl-12">
      <p class="text-sm text-slate-700 font-medium">
        {{ response.reply }}
      </p>
    </div>
  </div>
</template>
