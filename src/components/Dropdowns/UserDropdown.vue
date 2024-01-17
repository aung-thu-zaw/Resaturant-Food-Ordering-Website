<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="relative inline-flex" data-te-dropdown-ref>
    <button
      id="user-dropdown"
      type="button"
      data-te-dropdown-toggle-ref
      aria-expanded="false"
      class="inline-flex items-center"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full ring-2"
        >
          <img
            class="w-full h-full object-cover rounded-full align-middle border-none shadow-lg ring-1 ring-red-300"
            alt="user-photo"
            src="https://rare-gallery.com/thumbs/5408546-woman-female-girl-photographer-camera-beanie-pine-holding-hand-jean-jacket-red-film-caucasian-blonde-photography-nature-exterior-hat-vintage-contax-creative-commons-images.jpg"
          />
        </span>
        <span class="font-bold text-sm ml-2 text-slate-600 hidden md:block">Aung Thu Zaw</span>
      </div>
    </button>

    <ul
      class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-md [&[data-te-dropdown-show]]:block border border-gray-800 p-2"
      aria-labelledby="user-dropdown"
      data-te-dropdown-menu-ref
    >
      <li>
        <a
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-md"
          href="#"
          data-te-dropdown-item-ref
        >
          <i class="fa-solid fa-tv mr-1" />
          My Dashboard
        </a>
      </li>

      <li>
        <a
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-md"
          href="#"
          data-te-dropdown-item-ref
        >
          <i class="fa-solid fa-user-circle mr-1" />
          Profile
        </a>
      </li>
      <li>
        <a
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-md"
          href="#"
          data-te-dropdown-item-ref
        >
          <i class="fa-solid fa-gear mr-1" />
          Settings
        </a>
      </li>

      <hr class="my-2" />

      <li>
        <button
          @click="authStore.logout"
          type="button"
          class="block w-full whitespace-nowrap bg-transparent text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-md"
          data-te-dropdown-item-ref
        >
          <i class="fa-solid fa-right-from-bracket mr-1" />
          Logout
        </button>
      </li>
    </ul>
  </div>
</template>
