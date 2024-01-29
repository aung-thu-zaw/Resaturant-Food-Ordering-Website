<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import ProductCard from '@/components/Cards/ProductCard.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FilterByCategory from '@/components/Forms/SelectBoxs/FilterByCategory.vue'
import MenuFilterByRating from '@/components/Forms/SelectBoxs/MenuFilterByRating.vue'
import MenuSortBy from '@/components/Forms/SelectBoxs/MenuSortBy.vue'
import { onMounted } from 'vue'

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <AppLayout>
    <section class="background">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">Our Foods Menu</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">Menu</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <div class="bg-white border p-5 rounded-md">
          <div class="flex items-center justify-between">
            <div class="w-[350px]">
              <InputField type="text" name="search" placeholder="Search menu..." />
            </div>
            <div class="space-x-5">
              <FilterByCategory />

              <MenuFilterByRating />

              <MenuSortBy />
            </div>
          </div>

          <div></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('https://images7.alphacoders.com/132/1324477.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
