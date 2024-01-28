<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import OurTeamCard from '@/components/Cards/OurTeamCard.vue'
</script>

<template>
  <AppLayout>
    <section class="background">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">Meet Our Chefs</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">Chefs</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-gray-50">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <OurTeamCard />
          <OurTeamCard />
          <OurTeamCard />
          <OurTeamCard />
          <OurTeamCard />
          <OurTeamCard />
          <OurTeamCard />
          <OurTeamCard />
          <OurTeamCard />
          <OurTeamCard />
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('https://www.thechefisonthetable.com/wp-content/uploads/2019/09/restaurant-chef.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>