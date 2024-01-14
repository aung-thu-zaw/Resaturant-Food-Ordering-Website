<script setup>
</script>

<template>
  <div class="hs-dropdown relative inline-flex [--placement:bottom-right]">
    <button
      type="button"
      id="notification-dropdown"
      data-te-dropdown-toggle-ref
      aria-expanded="false"
      class="relative text-md text-gray-600 font-normal disabled:opacity-50 disabled:pointer-events-none hover:text-gray-500 ml-5"
    >
      <i class="fa-regular fa-bell" />

      <div
        class="absolute -top-1 -right-2 flex items-center justify-center w-3.5 h-3.5 rounded-full"
      >
        <span class="font-bold text-orange-500 text-[.65rem]"> 5 </span>
      </div>
    </button>

    <div
      class="transition-[opacity,margin] duration opacity-0 hidden w-[25rem] h-auto max-h-[40rem] overflow-auto bg-white shadow-md rounded-lg mt-2 border border-gray-300 divide-gray-500 [&[data-te-dropdown-show]]:block"
      aria-labelledby="user-dropdown"
      data-te-dropdown-menu-ref
    >
      <div class="px-4 py-3 bg-gray-100 flex items-center justify-between border-b w-full">
        <span class="text-gray-700 font-semibold text-md"> Notifications </span>
        <button type="button" class="text-primary hover:text-red-600 text-sm font-bold">
          Mark all as read
        </button>
      </div>

      <!-- No notification -->
      <div class="py-5">
        <p class="font-bold text-sm text-gray-600 text-center">There are no notifications.</p>
      </div>
    </div>
  </div>
</template>
