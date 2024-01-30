<script setup>
import { useRoute, useRouter } from 'vue-router'

defineProps({
  description: String
})

const route = useRoute()
const router = useRouter()

const goToTab = (tab) => router.push({ query: { tab } })
</script>

<template>
  <div>
    <div class="border border-gray-300 bg-white rounded-md">
      <ul
        class="flex list-none flex-row px-10 border-b border-b-gray-300"
        role="tablist"
        data-te-nav-ref
      >
        <li role="presentation">
          <button
            @click="goToTab('description')"
            type="button"
            class="block border-x-0 px-7 py-6 text-sm font-medium leading-tight"
            :class="{
              'text-orange-500 border-b-2  border-b-orange-500': route.query.tab === 'description',
              'text-slate-700': route.query.tab !== 'description'
            }"
          >
            <i class="fa-solid fa-file-lines mr-2"></i>
            Description
          </button>
        </li>

        <li role="presentation">
          <button
            @click="goToTab('reviews')"
            type="button"
            class="block border-x-0 border-b-2 border-t-0 border-transparent px-7 py-6 text-sm font-medium leading-tight"
            :class="{
              'text-orange-500 border-b-2  border-b-orange-500': route.query.tab === 'reviews',
              'text-slate-700': route.query.tab !== 'reviews'
            }"
          >
            <i class="fa-solid fa-star"></i>
            Reviews
          </button>
        </li>
      </ul>

      <!--Tabs content-->
      <div class="mb-6">
        <div v-if="route.query.tab === 'description'" class="px-10 py-5">
          <p v-html="description"></p>
        </div>

        <div v-if="route.query.tab === 'reviews'" class="px-10 py-5">This is reviews</div>
      </div>
    </div>
  </div>
</template>
