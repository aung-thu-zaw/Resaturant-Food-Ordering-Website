<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import DailyOfferSection from '@/components/Sections/DailyOfferSection.vue'
import FoodMenuSection from '@/components/Sections/FoodMenuSection.vue'
import OurTeamSection from '@/components/Sections/OurTeamSection.vue'
import LatestBlogSection from '@/components/Sections/LatestBlogSection.vue'
import HeaderMainSection from '@/components/Sections/HeaderMainSection.vue'
import { onMounted } from 'vue'

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <AppLayout>
    <HeaderMainSection />

    <DailyOfferSection />

    <FoodMenuSection />

    <OurTeamSection />

    <LatestBlogSection />
  </AppLayout>
</template>
