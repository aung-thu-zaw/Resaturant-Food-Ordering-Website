<script setup>
import image from '@/assets/images/no-image.jpeg'
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: image
  },
  class: {
    type: String,
    default: () => 'min-w-[50px]'
  }
})

const computedClasses = computed(() => props.class)
</script>

<template>
  <td class="px-6 py-4" :class="computedClasses">
    <div class="w-[70px] h-[70px] rounded-md border border-slate-300 overflow-hidden">
      <img v-if="src" :src="src" :alt="src" class="w-full h-full object-cover" />
      <img v-else :src="image" :alt="src" class="w-full h-full object-cover" />
    </div>
  </td>
</template>
