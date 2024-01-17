<script setup>
import FormButton from '@/components/Buttons/FormButton.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import { useTitle } from '@vueuse/core'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import logo from '@/assets/images/logo-color.png'

useTitle('Reset Password - Restaurant Food Ordering')

const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  token: route.params.token,
  email: route.query.email,
  password: '',
  password_confirmation: ''
})

const handleResetPassword = async () => {
  await authStore.resetPassword({
    token: form.token,
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation
  })
}
</script>

<template>
  <GuestLayout>
    <div class="mx-auto p-5 md:p-10 flex items-center justify-center">
      <div class="w-[500px] bg-white p-8 rounded-md">
        <form @submit.prevent="handleResetPassword" class="w-full space-y-6">
          <div class="flex items-center justify-center">
            <img :src="logo" alt="" class="h-12 object-contain" />
          </div>
          <div
            v-show="authStore.status"
            class="mb-4 font-medium text-sm text-green-600 bg-green-100 p-3 w-full rounded-md text-center"
          >
            {{ authStore.status }}
            <router-link :to="{ name: 'login' }" class="font-semibold">Go To Login</router-link>
          </div>

          <div>
            <InputLabel label="Email Address" required />

            <InputField
              type="email"
              name="your-email"
              icon="fa-envelope"
              placeholder="Enter Email Address"
              v-model="form.email"
              required
            />

            <InputError :message="authStore.errors?.email" />
          </div>

          <!-- Password Input -->
          <div>
            <InputLabel label="New Password" required />

            <InputField
              type="password"
              name="new-password"
              icon="fa-lock"
              placeholder="Enter New Password"
              v-model="form.password"
              required
            />

            <InputError :message="authStore.errors?.password" />
          </div>

          <div>
            <InputLabel label="Confirm Password" required />

            <InputField
              type="password"
              name="confirm-password"
              icon="fa-lock"
              placeholder="Re-type Password"
              v-model="form.password_confirmation"
              required
            />
          </div>

          <FormButton> Reset Password </FormButton>
        </form>
      </div>
    </div>
  </GuestLayout>
</template>