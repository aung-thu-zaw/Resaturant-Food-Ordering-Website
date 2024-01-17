<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const authStore = useAuthStore()

onMounted(() => {
  if (authStore.message) toast.success(authStore.message, { autoClose: 2000 })

  if (!authStore.isAuthenticated) authStore.getAuthenticatedUser()
})
</script>

<template>
  <div>
    =========================
    <br />
    {{ authStore.currentUser }}
    <br />
    =========================

    <button @click="authStore.logout">Logout</button>
    <slot />
  </div>
</template>