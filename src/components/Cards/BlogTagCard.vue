<script setup>
import { useBlogStore } from '@/stores/restaurant/blog'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useBlogStore()
const currentTag = ref(null)

const { tags } = storeToRefs(store)

onMounted(async () => await store.getResources())

const getTag = (tag) => (currentTag.value = tag)

watch(
  () => currentTag.value,
  () => {
    router.push({ name: 'blogs.index', query: { ...route.query, tag: currentTag.value } })
    window.scrollTo(0, 0)
  }
)
</script>

<template>
  <div
    class="p-5 border border-gray-300 rounded-md bg-white flex flex-col w-full items-center space-y-5"
  >
    <h1 class="font-bold text-orange-500 text-lg pb-3 border-b-2 border-b-orange-400 w-full">
      - Tags
    </h1>

    <div class="flex items-center flex-wrap w-full">
      <button
        v-for="tag in tags"
        :key="tag.id"
        type="button"
        class="bg-gray-50 px-3.5 py-2 mx-1.5 rounded-full border border-orange-400 hover:text-white hover:bg-orange-500 mb-3 font-bold text-xs text-slate-700 flex items-center justify-between hover:scale-105 duration-150"
        :class="{ 'bg-orange-500 text-white': tag.name === route.query?.tag }"
        @click="getTag(tag.name)"
      >
        {{ tag?.name }}
      </button>
    </div>
  </div>
</template>
