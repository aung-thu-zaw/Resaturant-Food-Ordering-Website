<script setup>
</script>

<template>
  <div id="preview-carousel" class="relative" data-te-carousel-init data-te-ride="carousel">
    <!--Carousel items-->
    <div
      class="relative w-full rounded-md overflow-hidden after:clear-both after:block after:content-['']"
    >
      <!--First item-->
      <div
        class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-item
        data-te-carousel-active
      >
        <img
          src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98="
          class="block w-full object-contain"
          alt="Wild Landscape"
        />

        <button
          type="button"
          class="z-50 absolute top-2 right-2 bg-black bg-opacity-40 text-white hover:text-red-600 duration-150 text-xs p-2 rounded-md hover:bg-opacity-50 cursor-pointer"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <!--Second item-->
      <div
        class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-item
      >
        <img
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
          class="block w-full object-contain"
          alt="Camera"
        />

        <button
          type="button"
          class="z-50 absolute top-2 right-2 bg-black bg-opacity-40 text-white hover:text-red-600 duration-150 text-xs p-2 rounded-md hover:bg-opacity-50 cursor-pointer"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <!--Third item-->
      <div
        class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-item
      >
        <img
          src="https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip"
          class="block w-full object-contain"
          alt="Exotic Fruits"
        />

        <button
          type="button"
          class="z-50 absolute top-2 right-2 bg-black bg-opacity-40 text-white hover:text-red-600 duration-150 text-xs p-2 rounded-md hover:bg-opacity-50 cursor-pointer"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>

    <!--Carousel controls - prev item-->
    <button
      class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      type="button"
      data-te-target="#preview-carousel"
      data-te-slide="prev"
    >
      <span class="inline-block h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </span>
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Previous</span
      >
    </button>
    <!--Carousel controls - next item-->
    <button
      class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      type="button"
      data-te-target="#preview-carousel"
      data-te-slide="next"
    >
      <span class="inline-block h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </span>
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Next</span
      >
    </button>
  </div>
</template>