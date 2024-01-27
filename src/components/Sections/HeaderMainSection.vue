<script setup></script>

<template>
  <header id="hero" class="min-h-[700px] background bg-purpleDark">
    <div class="relative bg-purpleDark bg-opacity-70 min-h-[700px]">
      <div class="absolute top-10 left-10">
        <img src="../../assets/images/tomato.png" alt="tomato" class="w-20 animate-rotate" />
      </div>
      <div class="absolute bottom-10 left-1/2">
        <img
          src="../../assets/images/half-tomato.png"
          alt="half-tomato"
          class="w-16 animate-moveRightLeft"
        />
      </div>
      <div class="absolute top-5 right-72">
        <img src="../../assets/images/leaf-1.png" alt="leaf-1" class="w-10 animate-moveRightLeft" />
      </div>
      <div class="absolute bottom-20 left-10">
        <img src="../../assets/images/leaf-2.png" alt="leaf-2" class="w-14 animate-sizePulse" />
      </div>
      <div class="absolute top-10 left-96">
        <img src="../../assets/images/pepper-1.png" alt="pepper-1" class="w-10 animate-sizePulse" />
      </div>
      <div class="absolute bottom-10 right-40">
        <img src="../../assets/images/pepper-2.png" alt="pepper-2" class="w-12 animate-rotate" />
      </div>
      <div
        class="flex flex-col md:flex-row items-center justify-center h-full md:space-x-5 py-28 md:p-28"
      >
        <div class="space-y-10 w-full md:w-1/2 p-5 md:p-0 text-center md:text-left">
          <h3 class="text-orange-500 font-pacifico text-3xl font-extrabold">
            Satisfy Your Cravings
          </h3>
          <h1 class="font-bold text-white text-5xl">Delicious Foods With Wonderful Eating</h1>
          <p class="font-medium text-white text-md">
            Elevate your dining experience with our exquisite range of flavors and delightful
            ambiance.
          </p>

          <div class="space-x-5">
            <button
              type="button"
              class="px-5 py-3.5 bg-orange-500 text-white rounded-full text-sm font-bold animate-press"
            >
              <i class="fa-solid fa-bag-shopping"></i>
              Order Now
            </button>
            <button
              type="button"
              class="px-5 py-3 bg-purpleDark text-white rounded-full text-sm font-bold border animate-press"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
              Browse More
            </button>
          </div>
        </div>

        <div class="w-full md:w-1/2 p-5 md:p-0">
          <div class="relative flex items-center justify-center">
            <div
              class="border-[14px] md:border-[18px] border-gray-500 border-opacity-20 rounded-full overflow-hidden w-[350px] h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center"
            >
              <img
                src="https://www.pngitem.com/pimgs/m/43-435438_meal-png-pic-chicken-dish-in-plate-png.png"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <div
              class="absolute top-6 left-28 bg-orange-500 w-[80px] h-[80px] rounded-full flex items-center justify-center p-5"
            >
              <span class="text-md font-extrabold font-pacifico text-white text-center">
                35 % OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.background {
  background-image: url('https://images5.alphacoders.com/116/1167731.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
