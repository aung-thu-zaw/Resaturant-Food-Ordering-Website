<script setup>
import OurTeamCarousel from '@/components/Carousels/OurTeamCarousel.vue'
</script>

<template>
  <section class="py-20 bg-[#edf6eb]">
    <div class="container mx-auto space-y-10">
      <div class="space-y-3">
        <h1 class="font-bold font-pacifico text-2xl text-orange-500">Our Team</h1>
        <p class="text-2xl md:text-4xl font-extrabold text-purpleDark">Meet Our Expert Chefs</p>
      </div>
      <div>
        <OurTeamCarousel />
      </div>
    </div>
  </section>
</template>