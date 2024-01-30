<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

useTitle('About - Restaurant Food Ordering')

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <AppLayout>
    <section class="background" data-aos="zoom-out" data-aos-duration="1000">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">About Us</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">About</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-gray-50">
      <div class="container mx-auto">this is about</div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('../../assets/images/about-cover.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
