<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import FoodMenuSection from '@/components/Sections/FoodMenuSection.vue'
import OurTeamSection from '@/components/Sections/OurTeamSection.vue'
import LatestBlogSection from '@/components/Sections/LatestBlogSection.vue'
import HeaderMainSection from '@/components/Sections/HeaderMainSection.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

useTitle('Home - Restaurant Food Ordering')

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <AppLayout>
    <HeaderMainSection />

    <FoodMenuSection />

    <OurTeamSection />

    <LatestBlogSection />
  </AppLayout>
</template>
