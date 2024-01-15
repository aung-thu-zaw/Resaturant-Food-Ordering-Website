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
    default: 'fa-home'
  }
})
</script>

<template>
  <nav class="flex mb-5 md:mb-0 overflow-x-auto w-full md:max-w-[1000px] px-0">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center text-slate-700 hover:text-primary duration-150">
        <router-link
          :to="targetIdentifier ? { name: to, params: targetIdentifier } : { name: to }"
          class="inline-flex items-center text-sm font-bold"
        >
          <span class="mr-2">
            <i class="fa-solid" :class="icon"></i>
          </span>
          {{ label }}
        </router-link>
      </li>
      <slot />
    </ol>
  </nav>
</template>
