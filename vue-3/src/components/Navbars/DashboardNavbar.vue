<script setup>
import UserDropdown from '@/components/Dropdowns/UserDropdown.vue'
import NotificationDropdown from '@/components/Dropdowns/NotificationDropdown.vue'
</script>

<template>
  <!-- Navbar -->
  <nav
    class="hidden w-full md:flex-row md:flex-nowrap md:justify-start md:flex items-center p-3.5 z-10"
  >
    <div
      class="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-6 px-4"
    >
      <!-- Form -->
      <form class="md:flex hidden flex-row flex-wrap items-center lg:mr-auto mr-3 w-[300px]">
        <div class="relative flex w-full flex-wrap items-stretch">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-slate-500 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
          >
            <i class="fas fa-search" />
          </span>
          <input
            type="text"
            placeholder="Search ( ctrl + k )"
            class="px-3 py-3 placeholder-gray-500 text-blueGray-600 relative bg-white rounded text-sm outline-none focus:outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400 font-medium w-full pl-10"
          />
        </div>
      </form>

      <!-- User -->
      <ul class="z-50 flex-col md:flex-row list-none items-center hidden md:flex space-x-10">
        <!-- Admin Dashboard Notification Dropdown -->
        <NotificationDropdown />

        <!-- User Dropdown -->
        <UserDropdown />
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
