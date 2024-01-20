<script setup>
import UserDropdown from '@/components/Dropdowns/UserDropdown.vue'
import { ref } from 'vue'
import logo from '../../assets/images/logo-color.png'
import { useRoute } from 'vue-router'

const route = useRoute()
const collapseShow = ref('hidden')

const toggleCollapseShow = (classes) => {
  collapseShow.value = classes
}

const getSidebarMenuActiveColor = (targetRoute) => {
  return route.path.startsWith(targetRoute)
    ? 'text-primary hover:text-red-500'
    : 'text-slate-600 hover:text-slate-800'
}

const defaultQueryParams = {
  page: 1,
  per_page: 5,
  sort: 'id',
  direction: 'desc'
}
</script>

<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
    data-te-sidenav-init
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center md:justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        @click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars" />
      </button>
      <!-- Brand -->
      <a
        class="md:block text-blueslate-600 mr-0 inline-block whitespace-nowrap text-sm px-0 py-1 text-center"
      >
        <img :src="logo" alt="logo" class="w-auto h-10 object-contain" />
      </a>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none ml-auto">
        <li class="inline-block relative">
          <!-- <DashboardNotificationDropdown /> -->
        </li>
        <li class="inline-block relative">
          <UserDropdown />
        </li>
      </ul>

      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded border border-accent-light md:border-none"
        :class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueslate-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <a
                class="md:block text-left md:pb-2 text-blueslate-600 mr-0 inline-block whitespace-nowrap text-sm p-4 px-0"
              >
                <img :src="logo" alt="logo" class="w-auto h-10 object-contain" />
              </a>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                @click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times" />
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="px-3 py-2 h-12 border border-solid border-blueslate-500 placeholder-blueslate-300 text-blueslate-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6 class="md:min-w-full font-bold text-xs block pt-1 pb-4 no-underline">
          Website Administration
        </h6>
        <!-- Navigation -->

        <ul
          class="md:flex-col md:min-w-full flex flex-col list-none text-sm font-[600]"
          data-te-sidenav-menu-ref
        >
          <!-- Dashboard -->
          <li class="items-center">
            <router-link
              :to="{ name: 'admin.dashboard' }"
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/dashboard')"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-tv mr-2" />
                Dashboard
              </div>
            </router-link>
          </li>

          <!-- Analytics -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/analytics')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-chart-line mr-2" />
                Analytics
              </div>
            </a>
          </li>

          <!-- Category -->
          <li v-show="can('categories.view')" class="items-center">
            <router-link
              :to="{ name: 'admin.categories.index', query: defaultQueryParams }"
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/categories')"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-list mr-2" />
                Categories
              </div>
            </router-link>
          </li>

          <!-- Products -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/products')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fa-solid fa-utensils mr-2"></i>
                Products
              </div>
            </a>
          </li>

          <!-- Product Reviews -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/product-reviews')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fa-solid fa-star mr-2"></i>
                Product Reviews
              </div>
            </a>
          </li>

          <!-- Daily Offer -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/daily-offers')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-clock mr-2" />
                Daily Offers
              </div>
            </a>
          </li>

          <!-- Coupons -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/coupons')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-ticket mr-2" />
                Coupons
              </div>
            </a>
          </li>

          <!-- Manage Shipping -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] text-slate-600 hover:text-slate-800 outline-none transition duration-300 ease-linear"
              data-te-sidenav-link-ref
            >
              <div class="text-[13px] py-3">
                <i class="fa-solid fa-truck-fast mr-2"></i>
                Manage Shipping
              </div>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-slate-600"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
              data-te-sidenav-collapse-ref
            >
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/delivery-areas')"
                  href="#"
                  data-te-sidenav-link-ref
                >
                  Delivery Areas
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/shipping-methods')"
                  data-te-sidenav-link-ref
                >
                  Shipping Methods
                </a>
              </li>
            </ul>
          </li>

          <!-- Manage Reservations -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] text-slate-600 hover:text-slate-800 outline-none transition duration-300 ease-linear"
              data-te-sidenav-link-ref
            >
              <div class="text-[13px] py-3">
                <i class="fa-solid fa-calendar-week mr-2"></i>
                Manage Reservations
              </div>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-slate-600"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
              data-te-sidenav-collapse-ref
            >
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/reservation-tables')"
                  data-te-sidenav-link-ref
                >
                  Reservation Tables
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/reservation-times')"
                  data-te-sidenav-link-ref
                >
                  Reservation Times
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/reservation-requests')"
                  data-te-sidenav-link-ref
                >
                  Reservation Requests
                </a>
              </li>
            </ul>
          </li>

          <!-- Manage Blogs -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] text-slate-600 hover:text-slate-800 outline-none transition duration-300 ease-linear"
              data-te-sidenav-link-ref
            >
              <div class="text-[13px] py-3">
                <i class="fa-solid fa-pen-nib mr-2"></i>
                Manage Blogs
              </div>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-slate-600"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
              data-te-sidenav-collapse-ref
            >
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/blog-categories')"
                  data-te-sidenav-link-ref
                >
                  Categories
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/blog-contents')"
                  data-te-sidenav-link-ref
                >
                  Contents
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/comments-and-replies')"
                  data-te-sidenav-link-ref
                >
                  Comments And Replies
                </a>
              </li>
            </ul>
          </li>

          <!-- Manage Shipping -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] text-slate-600 hover:text-slate-800 outline-none transition duration-300 ease-linear"
              data-te-sidenav-link-ref
            >
              <div class="text-[13px] py-3">
                <i class="fa-solid fa-envelope-open-text mr-2"></i>
                Newsletter
              </div>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-slate-600"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
              data-te-sidenav-collapse-ref
            >
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/subscribers')"
                  data-te-sidenav-link-ref
                >
                  All Subscribers
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/send-newsletter')"
                  data-te-sidenav-link-ref
                >
                  Send Newsletter
                </a>
              </li>
            </ul>
          </li>

          <!-- Chat Box -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/chat-box')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fa-solid fa-message mr-2"></i>
                Chat Box
              </div>
            </a>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6 class="md:min-w-full font-bold text-xs block pt-1 pb-4 no-underline">
          Orders And Management
        </h6>
        <!-- Navigation -->

        <ul
          class="md:flex-col md:min-w-full flex flex-col list-none text-sm font-[600]"
          data-te-sidenav-menu-ref
        >
          <!-- POS -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/pos')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-calculator mr-2" />
                POS
              </div>
            </a>
          </li>

          <!-- Customer Orders -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/customer-orders')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-cart-plus mr-2" />
                Customer Orders
              </div>
            </a>
          </li>

          <!-- Kitchen Orders -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/kitchen-orders')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fa-solid fa-kitchen-set mr-2"></i>
                Kitchen Orders
              </div>
            </a>
          </li>

          <!-- Counter Checkout -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/counter-checkout')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-desktop mr-2" />
                Counter Checkout
              </div>
            </a>
          </li>

          <!-- Menu Stock -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/menu-stock')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fa-solid fa-wheat-awn-circle-exclamation mr-2"></i>
                Menu Stock
              </div>
            </a>
          </li>

          <!-- Table Booking -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/table-booking')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fas fa-chair mr-2" />
                Table Booking
              </div>
            </a>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6 class="md:min-w-full font-bold text-xs block pt-1 pb-4 no-underline">
          Management & Oversight
        </h6>
        <!-- Navigation -->

        <ul
          class="md:flex-col md:min-w-full flex flex-col list-none text-sm font-[600]"
          data-te-sidenav-menu-ref
        >
          <!-- Employee Management -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] text-slate-600 hover:text-slate-800 outline-none transition duration-300 ease-linear"
              data-te-sidenav-link-ref
            >
              <div class="text-[13px] py-3">
                <i class="fa-solid fa-user-tie mr-2"></i>
                Employee Management
              </div>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-slate-600"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
              data-te-sidenav-collapse-ref
            >
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/employees')"
                  data-te-sidenav-link-ref
                >
                  All Employee
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/attendance-lists')"
                  data-te-sidenav-link-ref
                >
                  Attendance Lists
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/salary')"
                  data-te-sidenav-link-ref
                >
                  Salary
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/pay-salary')"
                  data-te-sidenav-link-ref
                >
                  Pay Salary
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/last-month-salary')"
                  data-te-sidenav-link-ref
                >
                  Last Month Salary
                </a>
              </li>
            </ul>
          </li>

          <!-- Supplier Management -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] text-slate-600 hover:text-slate-800 outline-none transition duration-300 ease-linear"
              data-te-sidenav-link-ref
            >
              <div class="text-[13px] py-3">
                <i class="fa-solid fa-people-carry-box mr-2"></i>
                Supplier Management
              </div>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-slate-600"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
              data-te-sidenav-collapse-ref
            >
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/suppliers')"
                  data-te-sidenav-link-ref
                >
                  All Suppliers
                </a>
              </li>
            </ul>
          </li>

          <!-- Customer Mangement -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/customer-management')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fa-solid fa-user mr-2"></i>
                Customer Management
              </div>
            </a>
          </li>

          <!-- Account Management -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] text-slate-600 hover:text-slate-800 outline-none transition duration-300 ease-linear"
              data-te-sidenav-link-ref
            >
              <div class="text-[13px] py-3">
                <i class="fa-solid fa-user-gear mr-2"></i>
                Account Management
              </div>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-slate-600"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
              data-te-sidenav-collapse-ref
            >
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/registered-accounts')"
                  data-te-sidenav-link-ref
                >
                  Registered Accounts
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/admin-manage')"
                  data-te-sidenav-link-ref
                >
                  Admin Manage
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/assign-role-permissions')"
                  data-te-sidenav-link-ref
                >
                  Assign Role Permissions
                </a>
              </li>
            </ul>
          </li>

          <!-- Authority Management -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] text-slate-600 hover:text-slate-800 outline-none transition duration-300 ease-linear"
              data-te-sidenav-link-ref
            >
              <div class="text-[13px] py-3">
                <i class="fa-solid fa-shield mr-2"></i>
                Authority Management
              </div>
              <span
                class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-slate-600"
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
              data-te-sidenav-collapse-ref
            >
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/permissions')"
                  data-te-sidenav-link-ref
                >
                  Permissions
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/roles')"
                  data-te-sidenav-link-ref
                >
                  Roles
                </a>
              </li>
              <li class="relative hover:bg-gray-100 duration-100 rounded-md">
                <a
                  class="flex font-semibold cursor-pointer items-center truncate rounded-[5px] py-3 pl-7 text-[0.8rem] outline-none transition duration-300 ease-linear"
                  :class="getSidebarMenuActiveColor('/admin/assign-role-permissions')"
                  data-te-sidenav-link-ref
                >
                  Assign Role Permissions
                </a>
              </li>
            </ul>
          </li>

          <!-- Settings -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/settings')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fa-solid fa-gear mr-2"></i>
                Settings
              </div>
            </a>
          </li>

          <!-- Database Backups -->
          <li class="items-center">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-3 text-[0.875rem] outline-none"
              :class="getSidebarMenuActiveColor('/admin/database-backups')"
              href="#"
            >
              <div class="text-[13px] py-3 block">
                <i class="fa-solid fa-database mr-2"></i>
                Database Backups
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
