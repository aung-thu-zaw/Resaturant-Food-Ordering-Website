<script setup>
import NormalButton from '@/components/Buttons/NormalButton.vue'
import { useRouter } from 'vue-router'

defineProps({
  disabled: {
    type: Boolean,
    required: true
  }
})

const router = useRouter()

const handleResetFilters = () =>
  router.push({
    query: {
      page: 1,
      per_page: 5,
      sort: 'id',
      direction: 'desc'
    }
  })
</script>

<template>
  <div>
    <NormalButton
      @click="handleResetFilters"
      class="bg-yellow-500 text-white hover:bg-yellow-600 duration-150 shadow-none disabled:bg-gray-300"
      :disabled="disabled"
    >
      Reset Filters
    </NormalButton>
  </div>
</template>
