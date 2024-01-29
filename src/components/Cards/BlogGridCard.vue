<script setup>
import { useRouter } from 'vue-router'

defineProps({ blog: Object })

const router = useRouter()
</script>

<template>
  <router-link
    :to="{ name: 'blogs.show', params: { slug: blog?.slug } }"
    class="group"
    :class="{
      'w-[300px]': router.currentRoute.value.path !== '/',
      'w-[400px]': router.currentRoute.value.path === '/'
    }"
  >
    <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
      <img
        class="w-full h-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
        :src="blog?.thumbnail"
        :alt="blog.title"
      />
      <span
        class="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-slate-800 text-white py-1.5 px-3"
      >
        {{ blog?.blog_category?.name }}
      </span>
    </div>

    <div class="mt-7">
      <h3 class="text-xl font-semibold text-slate-800 group-hover:text-slate-700 line-clamp-2">
        {{ blog?.title }}
      </h3>
      <p v-html="blog?.content" class="mt-3 text-slate-900 line-clamp-3 text-sm"></p>
      <router-link
        :to="{ name: 'blogs.show', params: { slug: blog?.slug } }"
        class="mt-5 inline-flex items-center gap-x-1 text-orange-600 decoration-2 group-hover:underline font-medium"
      >
        Read more
        <svg
          class="flex-shrink-0 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </router-link>
    </div>
  </router-link>
</template>