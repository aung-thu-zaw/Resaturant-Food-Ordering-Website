<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 font-roboto background">
    <div class="w-auto flex flex-col items-center justify-center space-y-5">
      <h1 class="text-yellow-600 text-[12rem] font-semibold">429</h1>

      <p class="text-white text-2xl font-medium text-center">Too Many Requests!</p>
      <p class="text-gray-200 text-md font-medium text-center">
        Too many requests were made from your IP address. Please wait a bit before trying again.
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