<script setup>
import AppNavbar from '@/components/Navbars/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import ScrollToTopButton from '@/components/Buttons/ScrollToTopButton.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { Dropdown, Ripple, Sidenav, Carousel, Select, Tab, initTE } from 'tw-elements'
import AOS from 'aos'

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.message) toast.success(authStore.message, { autoClose: 2000 })
  if (!authStore.isAuthenticated) await authStore.getAuthenticatedUser()

  initTE({ Dropdown, Ripple, Sidenav, Carousel, Select, Tab })
  AOS.init()
})
</script>

<template>
  <div class="min-h-screen bg-white font-roboto">
    <ScrollToTopButton />

    <AppNavbar />

    <slot />

    <AppFooter />
  </div>
</template>
