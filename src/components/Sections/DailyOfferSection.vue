<script setup>
import dailyOfferCarousel from '@/components/Carousels/dailyOfferCarousel.vue'
</script>

<template>
  <section class="py-20 bg-[#edf6eb]">
    <div class="container mx-auto space-y-10">
      <div class="space-y-3">
        <h1 class="font-bold font-pacifico text-2xl text-orange-500">Daily Offer</h1>
        <p class="text-2xl md:text-4xl font-extrabold text-purpleDark">
          Exciting New Dishes Await You
        </p>
      </div>
      <div>
        <dailyOfferCarousel />
      </div>
    </div>
  </section>
</template>

<style>
.gradient-color {
  background: rgb(254, 124, 10);
  background: linear-gradient(
    90deg,
    rgba(254, 124, 10, 0.16152398459383754) 0%,
    rgba(255, 255, 255, 0.6545211834733893) 35%,
    rgba(255, 255, 255, 0.16) 100%
  );
}
</style>