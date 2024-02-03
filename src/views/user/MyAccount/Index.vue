<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import PersonalInformation from './Partials/PersonalInformation.vue'
import ChangePassword from './Partials/ChangePassword.vue'
import DeleteAccount from './Partials/DeleteAccount.vue'
import { useTitle } from '@vueuse/core'
import { useRoute } from 'vue-router'

useTitle('My Account - Restaurant Food Ordering')

const route = useRoute()
</script>

<template>
  <AppLayout>
    <section class="container mx-auto py-8">
      <div class="my-5 flex items-center justify-center">
        <div>
          <router-link
            :to="{ name: 'my-account', query: { tab: 'personal-information' } }"
            class="py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 bg-transparent text-sm text-gray-700 font-semibold hover:text-orange-600"
            :class="{
              'text-orange-600 border-b-2 border-b-orange-500':
                route.query?.tab === 'personal-information' || !route.query.tab
            }"
          >
            Personal Information
          </router-link>

          <router-link
            :to="{ name: 'my-account', query: { tab: 'change-password' } }"
            class="py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 bg-transparent text-sm text-gray-700 font-semibold hover:text-orange-600"
            :class="{
              'text-orange-600 border-b-2 border-b-orange-500':
                route.query?.tab === 'change-password'
            }"
          >
            Change Password
          </router-link>

          <router-link
            :to="{ name: 'my-account', query: { tab: 'delete-account' } }"
            class="py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 bg-transparent text-sm text-gray-700 font-semibold hover:text-orange-600"
            :class="{
              'text-orange-600 border-b-2 border-b-orange-500':
                route.query?.tab === 'delete-account'
            }"
          >
            Delete Account
          </router-link>
        </div>
      </div>

      <div class="p-10 border border-gray-200 bg-white rounded-md max-w-[1000px] mx-auto">
        <div
          v-if="route.query?.tab === 'personal-information' || !route.query?.tab"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <PersonalInformation />
        </div>
        <div
          v-if="route.query?.tab === 'change-password'"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <ChangePassword />
        </div>
        <div
          v-if="route.query?.tab === 'delete-account'"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <DeleteAccount />
        </div>
      </div>
    </section>
  </AppLayout>
</template>