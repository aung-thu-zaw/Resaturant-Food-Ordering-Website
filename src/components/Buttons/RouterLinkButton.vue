<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true
  },

  class: {
    type: String,
    default: 'text-white bg-blue-600 hover:bg-blue-700'
  },

  targetIdentifier: {
    type: [Object],
    required: false
  },

  disabled: {
    type: Boolean,
    default: false
  }
})

const computedClasses = computed(() => props.class)
</script>

<template>
  <router-link
    :to="targetIdentifier ? { name: to, params: targetIdentifier } : { name: to }"
    v-slot="{ navigate }"
  >
    <button
      @click="navigate"
      type="button"
      class="text-[12.5px] px-4 shadow-md py-3 font-bold rounded-[5px] duration-150 active:animate-press"
      :class="computedClasses"
      :disabled="disabled"
    >
      <slot />
    </button>
  </router-link>
</template>
