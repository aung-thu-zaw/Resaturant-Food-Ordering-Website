<script setup>
import BlogCarousel from '@/components/Carousels/BlogCarousel.vue'
import { useHomeStore } from '@/stores/restaurant/home'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useHomeStore()

const { latestBlogs } = storeToRefs(store)

onMounted(async () => await store.getAllResources())
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto space-y-10">
      <div class="space-y-3">
        <h1 class="font-bold font-pacifico text-2xl text-orange-500">News & Blogs</h1>
        <p class="text-2xl md:text-4xl font-extrabold text-purpleDark">Our Latest Foods Blog</p>
      </div>
      <div class="">
        <BlogCarousel :latestBlogs="latestBlogs" data-aos="zoom-out" data-aos-duration="1000" />
      </div>
    </div>
  </section>
</template>
