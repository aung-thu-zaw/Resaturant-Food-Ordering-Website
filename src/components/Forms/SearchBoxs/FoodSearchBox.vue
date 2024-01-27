<script setup>
defineProps({
  search: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits('closedSearchBox')

const closeSearchBox = () => {
  emit('closedSearchBox')
}
</script>

<template>
  <div v-if="search" class="fixed z-50 top-0 right-0 left-0 bottom-0 bg-black bg-opacity-70">
    <div class="flex items-center justify-end p-5">
      <button
        @click="closeSearchBox"
        class="btn btn-sm md:btn-md btn-circle bg-orange-500 border-accent-light text-white hover:bg-orange-600 hover:border-accent-light transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div class="min-w-[300px] max-w-[1000px] mx-auto px-8 md:px-20">
      <form>
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only"
          >Search</label
        >
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-orange-300 focus:border-orange-300"
            placeholder="Search Drinks, Meals..."
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2 bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-3"
          >
            Search
          </button>
        </div>
      </form>

      <div
        class="border bg-white my-5 rounded-lg text-main-gray py-5 h-auto max-h-[500px] overflow-auto"
      >
        <ul class="text-xs font-medium">
          <li class="px-5 py-3">
            <h3 class="font-bold text-slate-600">
              <i class="fa-solid fa-clock mr-3"></i>
              Your Search History
            </h3>
          </li>
          <li class="hover:bg-orange-100 px-5 py-3 flex items-center justify-between">
            <span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, nihil? </span>
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center text-sm hover:text-orange-500 hover:bg-orange-200 transition-all cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </span>
          </li>
          <li class="hover:bg-orange-100 px-5 py-3 flex items-center justify-between">
            <span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, nihil? </span>
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center text-sm hover:text-orange-500 hover:bg-orange-200 transition-all cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </span>
          </li>
          <li class="hover:bg-orange-100 px-5 py-3 flex items-center justify-between">
            <span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, nihil? </span>
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center text-sm hover:text-orange-500 hover:bg-orange-200 transition-all cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </span>
          </li>

          <li class="px-5 py-3">
            <hr />
          </li>
          <li class="px-5 py-3">
            <h3 class="font-bold text-main-orange">
              <i class="fa-solid fa-lightbulb mr-3"></i>
              Suggest Search
            </h3>
          </li>

          <li class="hover:bg-orange-50 px-5 py-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, nihil?
          </li>
          <li class="hover:bg-orange-50 px-5 py-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, nihil?
          </li>
          <li class="hover:bg-orange-50 px-5 py-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, nihil?
          </li>
          <li class="hover:bg-orange-50 px-5 py-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, nihil?
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
