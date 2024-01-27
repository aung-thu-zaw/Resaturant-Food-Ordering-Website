<script setup>
import BlogCarousel from '@/components/Carousels/BlogCarousel.vue'
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto space-y-10">
      <div class="space-y-3">
        <h1 class="font-bold font-pacifico text-2xl text-orange-500">News & Blogs</h1>
        <p class="text-2xl md:text-4xl font-extrabold text-purpleDark">Our Latest Foods Blog</p>
      </div>
      <div>
        <BlogCarousel />
      </div>
    </div>
  </section>
</template>
