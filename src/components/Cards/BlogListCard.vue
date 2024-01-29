<script setup>
defineProps({ blog: Object })
</script>

<template>
  <router-link
    :to="{ name: 'blogs.show', params: { slug: blog?.slug } }"
    class="group rounded-xl overflow-hidden mb-5 block"
  >
    <div class="sm:flex">
      <div class="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
        <img
          class="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 start-0 object-cover rounded-xl"
          :src="blog?.thumbnail"
          alt="Image Description"
        />
      </div>

      <div class="grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
        <h3 class="text-xl font-semibold text-slate-800 group-hover:text-slate-700 line-clamp-2">
          {{ blog?.title }}
        </h3>

        <p v-html="blog?.content" class="mt-3 text-slate-900 line-clamp-3 text-sm"></p>

        <router-link
          :to="{ name: 'blogs.show', params: { slug: blog?.slug } }"
          class="mt-4 inline-flex items-center gap-x-1 text-orange-600 decoration-2 hover:underline font-medium"
        >
          Read more
          <svg
            class="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>
      </div>
    </div>
  </router-link>
</template>
