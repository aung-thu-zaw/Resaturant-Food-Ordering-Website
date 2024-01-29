<script setup>
import ProductCard from '@/components/Cards/ProductCard.vue'
import { useHomeStore } from '@/stores/restaurant/home'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useHomeStore()

const { popularFoods } = storeToRefs(store)

onMounted(async () => await store.getAllResources())
</script>

<template>
  <section class="py-20 gradient-color">
    <div class="container mx-auto space-y-10">
      <div class="space-y-3">
        <h1 class="font-bold font-pacifico text-2xl text-orange-500">Food Menu</h1>
        <p class="text-2xl md:text-4xl font-extrabold text-purpleDark">Popular Delicious Foods</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProductCard v-for="product in popularFoods" :key="product?.id" :product="product" />
      </div>
    </div>
  </section>
</template>

<style>
.gradient-color {
  background: rgb(254, 124, 10);
  background: linear-gradient(
    90deg,
    rgba(254, 124, 10, 0.16152398459383754) 0%,
    rgba(255, 255, 255, 0.6545211834733893) 35%,
    rgba(255, 255, 255, 0.16) 100%
  );
}
</style>