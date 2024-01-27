<script setup>
</script>

<template>
  <a class="group w-[400px]" href="#">
    <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
      <img
        class="w-full h-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
        src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
        alt="Image Description"
      />
      <span
        class="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-slate-800 text-white py-1.5 px-3"
      >
        Sponsored
      </span>
    </div>

    <div class="mt-7">
      <h3 class="text-xl font-semibold text-slate-800 group-hover:text-slate-700">
        Studio by Preline
      </h3>
      <p class="mt-3 text-slate-900">
        Produce professional, reliable streams easily leveraging Preline's innovative broadcast
        studio
      </p>
      <p
        class="mt-5 inline-flex items-center gap-x-1 text-orange-600 decoration-2 group-hover:underline font-medium"
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
      </p>
    </div>
  </a>
</template>