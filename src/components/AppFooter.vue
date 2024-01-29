<script setup></script>

<template>
  <footer class="w-full bg-purpleDark px-10 md:px-20 py-10">
    <div
      class="flex flex-col md:flex-row items-center md:items-start justify-between md:space-x-10 space-y-10 md:space-y-0 borer"
    >
      <div class="w-full md:w-1/3 space-y-5 md:px-10">
        <a href="https://flowbite.com" class="flex items-center justify-center md:justify-start">
          <img src="../assets/images/logo-white.png" class="h-16 mr-3" alt="restaurant" />
        </a>

        <p class="text-xs font-medium text-white font-lato text-center md:text-left">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque sequi officiis suscipit
          molestiae odit! Esse voluptate at officiis quidem obcaecati.
        </p>

        <div class="space-y-3">
          <div
            class="flex items-center justify-center md:justify-start text-white font-lato text-sm font-semibold"
          >
            <span class="mr-3">
              <i class="fa-solid fa-envelope"></i>
            </span>
            <p>aungthuzaw@gmail.com</p>
          </div>
          <div
            class="flex items-center justify-center md:justify-start text-white font-lato text-sm font-semibold"
          >
            <span class="mr-3">
              <i class="fa-solid fa-phone"></i>
            </span>
            <p>+9593443534545</p>
          </div>
          <div
            class="flex items-center justify-center md:justify-start text-white font-lato text-sm font-semibold"
          >
            <span class="mr-3">
              <i class="fa-solid fa-location-dot"></i>
            </span>
            <p>Taninartharyi Region, Myeik</p>
          </div>
        </div>
      </div>

      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="space-y-5 text-center md:text-left">
          <h2 class="font-bold font-lato text-white text-lg border-b-4 py-3 inline-block">
            Help Links
          </h2>

          <ul class="md:list-inside md:list-disc text-sm text-white font-lato space-y-3">
            <li>Terms And Conditions</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div class="space-y-5 text-center md:text-left">
          <h2 class="font-bold font-lato text-white text-lg border-b-4 py-3 inline-block">
            Short Links
          </h2>

          <ul class="md:list-inside md:list-disc text-sm text-white font-lato space-y-3">
            <li>Home</li>
            <li>About Us</li>
            <li>Our Service</li>
            <li>Gallery</li>
          </ul>
        </div>
        <div class="space-y-5 w-full grid-flow-col">
          <div class="text-center md:text-left">
            <h2 class="font-bold font-lato text-white text-lg border-b-4 py-3 inline-block mb-5">
              Subscribe
            </h2>

            <form
              class="border px-2 py-2 rounded-full flex items-center justify-between bg-gray-50 max-w-[250px] mx-auto md:mx-0"
            >
              <input
                type="text"
                class="text-sm font-bold font-lato text-black w-full border-none focus:ring-0 bg-gray-50"
                placeholder="Enter your email"
              />
              <button
                class="px-2 md:px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold rounded-full"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div class="text-center md:text-left">
            <h2 class="font-bold font-lato text-white text-lg border-b-4 py-3 inline-block mb-5">
              Follow us
            </h2>

            <div class="flex items-center justify-center md:justify-start space-x-5 w-full">
              <button
                type="button"
                class="w-8 h-8 rounded-full p-1 flex items-center justify-center text-purpleDark bg-white shadow-md cursor-pointer hover:bg-purpleDark hover:text-white transition-all border border-white"
              >
                <i class="fa-brands fa-facebook"></i>
              </button>
              <button
                type="button"
                class="w-8 h-8 rounded-full p-1 flex items-center justify-center text-purpleDark bg-white shadow-md cursor-pointer hover:bg-purpleDark hover:text-white transition-all border border-white"
              >
                <i class="fa-brands fa-instagram"></i>
              </button>
              <button
                type="button"
                class="w-8 h-8 rounded-full p-1 flex items-center justify-center text-purpleDark bg-white shadow-md cursor-pointer hover:bg-purpleDark hover:text-white transition-all border border-white"
              >
                <i class="fa-brands fa-linkedin"></i>
              </button>
              <button
                type="button"
                class="w-8 h-8 rounded-full p-1 flex items-center justify-center text-purpleDark bg-white shadow-md cursor-pointer hover:bg-purpleDark hover:text-white transition-all border border-white"
              >
                <i class="fa-brands fa-twitter"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-5" />

    <p class="text-white font-lato font-bold text-sm text-center">
      © 2021-2022 Restaurant. All Rights Reserved.
    </p>
  </footer>
</template>
