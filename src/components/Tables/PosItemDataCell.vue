<script setup>
</script>

<template>
  <tr class="border-b text-center font-semibold text-purpleDark">
    <td class="border-r px-4 py-3">
      <div class="flex flex-col items-center justify-center">
        <span class="min-w-[250px] line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
        <span class="min-w-[250px] text-orange-500 line-clamp-1 text-[.65rem]">
          More Cheese | More Meat | More Sauce
        </span>
      </div>
    </td>

    <td class="border-r px-4 py-3">
      <span class="min-w-[100px] line-clamp-1"> $ 120 </span>
    </td>

    <td class="border-r px-4 py-3">
      <div class="flex items-center justify-center">
        <div class="flex items-center space-x-1.5 border border-gray-300 p-1 rounded-full">
          <button
            type="button"
            class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 rounded-full text-xs w-6 h-6 flex items-center justify-center"
          >
            <i class="fa-solid fa-plus text-white"></i>
          </button>

          <input
            type="number"
            value="1"
            class="w-[30px] border-none font-semibold text-sm text-gray-800 outline-none border text-center bg-transparent"
          />

          <button
            type="button"
            class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 mr-2 rounded-full text-xs w-6 h-6 flex items-center justify-center"
          >
            <i class="fa-solid fa-minus text-white"></i>
          </button>
        </div>
      </div>
    </td>
    <td class="border-r px-4 py-3">
      <span class="min-w-[50px] line-clamp-1"> $ 120 </span>
    </td>
    <td class="border-r px-4 py-3">
      <button type="button" class="text-xs text-orange-600 hover:text-orange-600">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </td>
  </tr>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

.scrollbar::-webkit-scrollbar {
  height: 10px;
}
</style>
