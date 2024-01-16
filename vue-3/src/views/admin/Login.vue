<script setup>
import FormButton from '@/components/Buttons/FormButton.vue'
import Checkbox from '@/components/Forms/Fields/Checkbox.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import { useTitle } from '@vueuse/core'
import image from '@/assets/images/admin-login.jpg'
import { reactive } from 'vue'

useTitle('Admin Dashboard Login - Restaurant Food Ordering')

const form = reactive({
  email: '',
  password: ''
})
</script>

<template>
  <GuestLayout>
    <div class="mx-auto p-5 md:p-10 flex items-center justify-center">
      <div
        class="relative flex flex-col items-center justify-between bg-white border rounded-md shadow-md w-auto max-w-[600px] p-10 pb-14"
      >
        <img :src="image" alt="admin-login" class="w-full" />
        <div class="flex flex-col items-center w-full md:px-5">
          <form class="w-full space-y-6">
            <h1 class="text-center text-2xl text-dark mb-5 font-bold">Admin Dashboard Login</h1>

            <!-- <div
              class="mb-4 font-medium text-sm text-green-600 bg-green-100 p-3 w-full rounded-md text-center"
            >
              this is status
            </div> -->
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

              <InputError message="Email address field is required" />
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

              <InputError message="Password field is required" />
            </div>

            <!-- Remember me and Forgot Password -->
            <div class="flex items-center justify-between mb-5">
              <div>
                <label class="flex items-center">
                  <Checkbox name="remember" />
                  <span class="ml-2 text-sm text-slate-600"> Remember Me</span>
                </label>
              </div>

              <div>
                <a
                  href="#"
                  class="underline text-sm text-slate-600 font-[500] rounded-md hover:text-red-600"
                >
                  Forgot Password ?
                </a>
              </div>
            </div>

            <FormButton> Login </FormButton>
          </form>
        </div>
      </div>
    </div>
  </GuestLayout>
</template>