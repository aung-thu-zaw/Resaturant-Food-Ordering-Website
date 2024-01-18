<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: Number,
    required: true
  }
})

const title = computed(() => {
  return {
    503: 'Service Unavailable !',
    500: 'Server Error !',
    429: 'Too Many Requests !',
    404: 'Page Not Found !',
    403: 'Forbidden !',
    401: 'Unauthorized !',
    400: 'Bad Request !'
  }[props.status]
})

const description = computed(() => {
  return {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    429: 'Too many requests were made from your IP address. Please wait a bit before trying again.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
    401: 'You are not authorized to access this resource.',
    400: 'Oops, there was a problem with your request. Please check the provided data and try again.'
  }[props.status]
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 font-roboto background">
    <div class="w-auto flex flex-col items-center justify-center space-y-5">
      <h1 class="text-yellow-600 text-[12rem] font-semibold">{{ status }}</h1>

      <p class="text-white text-2xl font-medium text-center">{{ title }}</p>
      <p class="text-gray-200 text-md font-medium text-center">
        {{ description }}
      </p>

      <router-link
        :to="{ name: 'home' }"
        class="border text-gray-200 border-yellow-600 hover:bg-yellow-600 hover:text-white duration-150 text-sm font-[500] px-5 py-3 rounded-sm block"
      >
        <i class="fa-solid fa-arrow-left"></i>
        Go Back To Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url('https://t4.ftcdn.net/jpg/04/43/37/07/360_F_443370711_sqHRnSIQovW6uyQ5ZwDpd4kjCG8Q6swm.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: overlay;
}
</style>