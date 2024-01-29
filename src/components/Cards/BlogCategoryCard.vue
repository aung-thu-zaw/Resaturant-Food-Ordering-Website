<script setup>
import { useBlogStore } from '@/stores/restaurant/blog'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useBlogStore()
const categorySlug = ref(null)

const { categories } = storeToRefs(store)

onMounted(async () => await store.getResources())

const getCategorySlug = (slug) => (categorySlug.value = slug)

watch(
  () => categorySlug.value,
  () =>
    router.push({ name: 'blogs.index', query: { ...route.query, category: categorySlug.value } })
)
</script>

<template>
  <div
    class="p-5 border border-gray-300 rounded-md bg-white flex flex-col w-full items-center space-y-5"
  >
    <h1 class="font-bold text-orange-500 text-lg pb-3 border-b-2 border-b-orange-400 w-full">
      - Categories
    </h1>

    <div class="space-y-3 w-full">
      <button
        type="button"
        v-for="category in categories"
        :key="category.id"
        class="bg-gray-50 px-5 py-3 round-md border border-gray-200 w-full font-semibold text-sm text-slate-700 rounded-md flex items-center justify-between hover:scale-105 duration-150"
        :class="{ 'bg-orange-500 text-white': category.slug === route.query?.category }"
        @click="getCategorySlug(category.slug)"
      >
        <span href="#"> {{ category?.name }} </span>
        <span
          class="text-orange-500"
          :class="{ 'text-white': category.slug === route.query?.category }"
        >
          |&nbsp;&nbsp; {{ category?.blog_contents_count }}</span
        >
      </button>
    </div>
  </div>
</template>