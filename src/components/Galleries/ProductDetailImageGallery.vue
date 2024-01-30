<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({ product: Object })

const images = ref([])
const activeImageIndex = ref(0)

watch(
  () => props.product,
  () => {
    images.value = [props.product?.image]
    props.product?.additional_images?.forEach((image) => images.value.push(image?.image))
  }
)

const activeImage = computed(() => images.value[activeImageIndex.value])
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="text-center mb-5 h-[400px] rounded-md overflow-hidden">
      <img
        class="object-cover inline-block w-[500px] h-full"
        :src="activeImage"
        alt="product-name"
      />
    </div>

    <div class="space-x-2 overflow-auto whitespace-nowrap p-3">
      <div
        v-for="(image, index) in images"
        :key="image?.id"
        class="inline-block border border-gray-400 p-0.5 rounded-sm hover:border-orange-500"
        :class="{ 'border-orange-500 ring-2 ring-orange-300': activeImageIndex === index }"
        @click="activeImageIndex = index"
      >
        <img class="w-14 h-14 rounded-sm object-cover" :src="image" :alt="image" />
      </div>
    </div>
  </div>
</template>
