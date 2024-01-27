<script setup>
import FoodSearchBox from '@/components/Forms/SearchBoxs/FoodSearchBox.vue'
import UserDropdown from '@/components/Dropdowns/UserDropdown.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchBox = ref(false)
const router = useRouter()
</script>

<template>
  <nav class="sticky top-0 z-50">
    <div class="bg-purpleDark h-[50px]">
      <h1></h1>
    </div>
    <div class="w-full bg-white">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="" class="flex items-center">
          <img src="../../assets/images/logo-color.png" class="h-12 mr-3" alt="restaurant" />
        </a>

        <div class="md:order-2 flex items-center space-x-5 w-auto">
          <div class="flex items-center space-x-8">
            <div class="">
              <div
                @click="searchBox = !searchBox"
                class="tooltip tooltip-bottom tooltip-warning cursor-pointer"
                data-tip="Search"
              >
                <span class="text-main-orange">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
              <FoodSearchBox :search="searchBox" @closedSearchBox="searchBox = false" />
            </div>

            <!-- <div class="inline-block">
            <CartDropdown />
          </div> -->

            <div class="inline-block">
              <UserDropdown />

              <!-- <div class="text-orange-500 flex items-center">
              <div>
                <button
                  type="button"
                  class="text-sm font-bold hover:text-orange-600 hover:bg-orange-200 transition-all px-3 py-2 rounded-full"
                >
                  <i class="fa-solid fa-right-to-bracket mr-1"></i>

                  Login
                </button>
              </div>

              <span class="mx-2 hidden md:block">|</span>

              <div class="hidden md:block">
                <button
                  type="button"
                  class="text-sm font-bold hover:text-orange-600 hover:bg-orange-200 transition-all px-3 py-2 rounded-full"
                >
                  <i class="fa-solid fa-user mr-1"></i>

                  Sign Up
                </button>
              </div>
            </div> -->
            </div>

            <button
              type="button"
              class="hidden md:block px-5 py-3 text-white bg-orange-500 rounded-full text-sm capitalize font-bold font-roboto border-none hover:bg-orange-500"
            >
              <i class="fa-solid fa-calendar-check text-md"></i>
              Reservation
            </button>
          </div>

          <button
            data-collapse-toggle="mega-menu-full"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mega-menu-full"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          id="mega-menu-full"
          class="items-center justify-between hidden w-full xl:flex xl:w-auto xl:order-1 font-bold"
        >
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 border text-slate-800 border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0"
          >
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0"
                :class="{ 'text-orange-500': router.currentRoute.value.path === '/' }"
              >
                Home
              </router-link>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0"
                >About</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0"
                >Chefs</a
              >
            </li>

            <li>
              <router-link
                :to="{ name: 'menu' }"
                class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0"
                :class="{ 'text-orange-500': router.currentRoute.value.path === '/menu' }"
              >
                Menu
              </router-link>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0"
                >Blogs</a
              >
            </li>

            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0"
                >Contact</a
              >
            </li>
          </ul>

          <div class="flex items-center justify-center md:hidden space-x-8 my-3">
            <div class="text-orange-500 hidden md:block">
              <div>
                <button
                  type="button"
                  class="text-sm font-bold hover:text-orange-600 hover:bg-orange-200 transition-all px-3 py-2 rounded-full"
                >
                  <i class="fa-solid fa-right-to-bracket mr-1"></i>

                  Login
                </button>
              </div>

              <span class="mx-2">|</span>

              <div class="hidden md:block">
                <button
                  type="button"
                  class="text-sm font-bold hover:text-orange-600 hover:bg-orange-200 transition-all px-3 py-2 rounded-full"
                >
                  <i class="fa-solid fa-user mr-1"></i>

                  Sign Up
                </button>
              </div>
            </div>

            <button
              type="button"
              class="px-5 py-3 text-white bg-orange-500 rounded-full text-sm capitalize font-bold font-roboto border-none hover:bg-orange-500"
            >
              <i class="fa-solid fa-calendar-check text-md"></i>
              Reservation
            </button>
          </div>
        </div>
      </div>

      <div
        id="mega-menu-full"
        class="bg-orange-500 text-sm p-4 items-center justify-center font-bold hidden w-full lg:flex xl:hidden"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0"
        >
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purpleDark md:p-0"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purpleDark md:p-0"
              >About</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purpleDark md:p-0"
              >Chefs</a
            >
          </li>

          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purpleDark md:p-0"
              >Blogs</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purpleDark md:p-0"
              >Menus</a
            >
          </li>

          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purpleDark md:p-0"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>