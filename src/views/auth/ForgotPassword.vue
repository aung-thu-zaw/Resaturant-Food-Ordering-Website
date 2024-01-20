<script setup>
import FormButton from '@/components/Buttons/FormButton.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

useTitle('Forgot Password - Restaurant Food Ordering')

const authStore = useAuthStore()
const email = ref('')

const handleForgotPassword = async () => {
  await authStore.forgotPassword(email.value)
}
</script>

<template>
  <GuestLayout>
    <div class="mx-auto p-5 md:p-10 flex items-center justify-center">
      <div class="w-[500px] bg-white p-8 rounded-md">
        <form @submit.prevent="handleForgotPassword" class="w-full space-y-6">
          <h1 class="text-center text-2xl text-dark mb-5 font-bold">Forgot password?</h1>

          <p class="text-sm text-center">
            Remember your password?
            <router-link :to="{ name: 'login' }" class="font-semibold hover:underline text-red-600">
              Login here
            </router-link>
          </p>

          <div
            v-show="authStore.status"
            class="mb-4 font-medium text-sm text-green-600 bg-green-100 p-3 w-full rounded-md text-center"
          >
            {{ authStore.status }}
          </div>
          <!-- Email Input -->
          <div>
            <InputLabel label="Email Address" required />

            <InputField
              type="email"
              name="your-email"
              icon="fa-envelope"
              placeholder="Enter Email Address"
              v-model="email"
              required
            />

            <InputError :message="authStore.errors?.email" />
          </div>

          <FormButton> Submit </FormButton>
        </form>
      </div>
    </div>
  </GuestLayout>
</template>
