<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <section class="background">
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
  background-image: url('https://qul.imgix.net/5692a72f-29e9-4d77-bca5-b8728e7cdae6/473698_sld.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
