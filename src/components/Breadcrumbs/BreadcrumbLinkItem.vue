<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },

  targetIdentifier: {
    type: [Object],
    required: false
  },

  label: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <li class="text-slate-700 hover:text-primary duration-150">
    <div class="flex items-center">
      <i class="fa-solid fa-angle-right text-gray-500"></i>

      <router-link
        :to="targetIdentifier ? { name: to, params: targetIdentifier } : { name: to }"
        class="inline-flex items-center text-sm font-bold"
      >
        <span class="mr-2">
          <i class="fa-solid" :class="icon"></i>
        </span>
        {{ label }}
      </router-link>
    </div>
  </li>
</template>
