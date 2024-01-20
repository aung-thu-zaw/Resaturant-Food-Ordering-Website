<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.message) toast.success(authStore.message, { autoClose: 2000 })

  if (!authStore.isAuthenticated) await authStore.getAuthenticatedUser()
})
</script>

<template>
  <div>
    =========================
    <br />
    {{ authStore.currentUser }}
    <br />

    {{ authStore.isAuthenticated }}
    =========================

    <button v-show="authStore.isAuthenticated" @click="authStore.logout">Logout</button>
    <slot />
  </div>
</template>
