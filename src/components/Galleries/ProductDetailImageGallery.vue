<script setup>
import { computed, reactive, ref } from 'vue'

const images = reactive([
  'https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/food-photography/CODERED_B1_food-photography_p4b_690x455.jpg.img.jpg',
  'https://www.wisemonkeys.ae/wp-content/uploads/2023/04/food-photography-an-overview.webp',
  'https://images.squarespace-cdn.com/content/v1/5705c778d210b8bf599d454c/1584232784066-JN70D7ZRD0NU5QZNT18W/Cook_and_Waiter-20big.jpg',
  'https://media.photographycourse.net/wp-content/uploads/2022/04/08152853/famous-food-photographers-1.jpg',
  'https://expertphotography.b-cdn.net/wp-content/uploads/2020/04/food-photography-blogs-spread.jpg',
  'https://thumbs.dreamstime.com/b/heart-shape-various-vegetables-fruits-healthy-food-concept-isolated-white-background-140287808.jpg'
])

const activeImageIndex = ref(0)

const activeImage = computed(() => images[activeImageIndex.value])
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
        :key="image.id"
        class="inline-block border border-gray-400 p-0.5 rounded-sm hover:border-orange-500"
        :class="{ 'border-orange-500 ring-2 ring-orange-300': activeImageIndex === index }"
        @click="activeImageIndex = index"
      >
        <img class="w-14 h-14 rounded-sm object-cover" :src="image" :alt="image" />
      </div>
    </div>
  </div>
</template>
