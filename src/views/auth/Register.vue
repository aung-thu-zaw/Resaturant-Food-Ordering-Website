<script setup>
import FormButton from '@/components/Buttons/FormButton.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import { useTitle } from '@vueuse/core'
import image from '@/assets/images/register.jpg'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

useTitle('Register - Restaurant Food Ordering')

const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleRegister = async () => {
  await authStore.register({
    name: form.name,
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation
  })
}
</script>

<template>
  <GuestLayout>
    <div class="mx-auto p-5 md:p-10 flex items-center justify-center">
      <div
        class="w-auto md:w-[1200px] relative flex flex-col md:flex-row items-center justify-between bg-white border rounded-md shadow-md max-w-[1200px] p-10 pb-14"
      >
        <img :src="image" alt="register" class="w-full md:w-1/2" />
        <div class="flex flex-col items-center md:px-5 w-full md:w-1/2">
          <form @submit.prevent="handleRegister" class="w-full space-y-6">
            <h1 class="text-center text-2xl text-dark mb-5 font-bold">Create A New Account</h1>

            <!-- Name Input -->
            <div>
              <InputLabel label="Full Name" required />

              <InputField
                type="text"
                name="your-name"
                icon="fa-user"
                placeholder="Enter Your Full Name"
                v-model="form.name"
                required
              />

              <InputError :message="authStore.errors?.name" />
            </div>

            <!-- Email Input -->
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
              <InputLabel label="Password" required />

              <InputField
                type="password"
                name="your-password"
                icon="fa-lock"
                placeholder="Enter Password"
                v-model="form.password"
                required
              />

              <InputError :message="authStore.errors?.password" />
            </div>

            <!-- Confirm Password Input -->
            <div>
              <InputLabel label="Confirm Password" required />

              <InputField
                type="password"
                name="your-confirm-password"
                icon="fa-lock"
                placeholder="Enter Password"
                v-model="form.password_confirmation"
                required
              />
            </div>

            <FormButton> Register </FormButton>

            <p class="text-center text-sm">
              Already have an account?
              <router-link
                :to="{ name: 'login' }"
                class="text-red-600 font-bold hover:cursor-pointer hover:underline"
              >
                Login
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </GuestLayout>
</template>
