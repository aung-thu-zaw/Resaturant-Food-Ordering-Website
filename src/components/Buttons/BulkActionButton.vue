<script setup>
import { computed } from 'vue'

const props = defineProps({
  class: {
    type: String,
    default: 'text-slate-700'
  }
})
const computedClasses = computed(() => props.class)
</script>

<template>
  <li>
    <a
      href="#"
      class="flex items-center gap-x-3.5 py-2 px-3 rounded-md font-semibold hover:bg-gray-100 text-sm w-full"
      :class="computedClasses"
      data-te-dropdown-item-ref
    >
      <slot />
    </a>
  </li>
</template>
