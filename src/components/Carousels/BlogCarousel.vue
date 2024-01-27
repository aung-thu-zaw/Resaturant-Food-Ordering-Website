<script setup>
import BlogCard from '@/components/Cards/BlogCard.vue'

// defineProps({ productBanners: Object });

let defaultTransform = 0

const goNext = () => {
  defaultTransform = defaultTransform - 398
  var blogCarousel = document.getElementById('blog-carousel')
  if (Math.abs(defaultTransform) >= blogCarousel.scrollWidth / 1.7) defaultTransform = 0
  blogCarousel.style.transform = 'translateX(' + defaultTransform + 'px)'
}

const goPrev = () => {
  var blogCarousel = document.getElementById('blog-carousel')
  if (Math.abs(defaultTransform) === 0) defaultTransform = 0
  else defaultTransform = defaultTransform + 398
  blogCarousel.style.transform = 'translateX(' + defaultTransform + 'px)'
}
</script>

<template>
  <div class="relative flex items-center justify-center w-full h-full py-4">
    <div class="w-full relative flex items-center justify-center">
      <div class="absolute -top-20 right-0 flex items-center space-x-3">
        <button
          type="button"
          aria-label="slide backward"
          class="border w-10 h-10 rounded-full flex items-center justify-center text-white bg-orange-500 hover:bg-orange-600 shadow transition-all focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
          @click="goPrev"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>

        <button
          type="button"
          aria-label="slide forward"
          class="border w-10 h-10 rounded-full flex items-center justify-center text-white bg-purpleDark hover:bg-indigo-950 shadow transition-all focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          @click="goNext"
        >
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden rounded-md">
        <div
          id="blog-carousel"
          class="h-full flex gap-8 items-center justify-start transition ease-out duration-700"
        >
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
          <div class="flex flex-shrink-0 relative rounded-md overflow-hidden">
            <BlogCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
