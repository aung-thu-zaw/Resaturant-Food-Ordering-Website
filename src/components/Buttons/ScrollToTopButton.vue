<script setup>
import { ref, onMounted } from 'vue'
const scrollBtn = ref(null)
onMounted(() => {
  scrollBtn.value = document.querySelector('#scrollBtn')
})
window.onscroll = function () {
  scrollFunction()
}
const scrollFunction = () => {
  if (
    scrollBtn.value &&
    (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
  ) {
    scrollBtn.value.style.display = 'block'
  } else if (scrollBtn.value) {
    scrollBtn.value.style.display = 'none'
  }
}
const goToTop = () => {
  document.documentElement.scrollIntoView({ behavior: 'smooth' })
}
</script>


<template>
  <div
    id="scrollBtn"
    @click="goToTop"
    class="fixed bottom-20 right-2 text-xs border border-accent-light shadow-lg px-3 py-2 rounded-full z-50 bg-orange-500 hover:bg-orange-600 font-bold font-roboto text-white rotate-90 cursor-pointer"
  >
    <i class="fa-solid fa-arrow-left animate-pulse mr-2"></i>
    Go To Top
  </div>
</template>
