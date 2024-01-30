<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import ProductCard from '@/components/Cards/ProductCard.vue'
import FilterByCategory from '@/components/Forms/SelectBoxs/FilterByCategory.vue'
import MenuFilterByRating from '@/components/Forms/SelectBoxs/MenuFilterByRating.vue'
import MenuSortBy from '@/components/Forms/SelectBoxs/MenuSortBy.vue'
import FilterSearchBox from '@/components/Forms/SearchBoxs/FilterSearchBox.vue'
import Pagination from '@/components/Paginations/AppPagination.vue'
import { onMounted, watch } from 'vue'
import { useMenuStore } from '@/stores/restaurant/menu'
import { storeToRefs } from 'pinia'
import { useQueryStringParams } from '@/composables/useQueryStringParams'
import { useRoute } from 'vue-router'
import MenuFilteredByTags from '@/components/MenuFilteredByTags.vue'
import { useTitle } from '@vueuse/core'

useTitle('Menus - Restaurant Food Ordering')

const store = useMenuStore()
const route = useRoute()

const { menus, categories } = storeToRefs(store)
const { menuParams } = useQueryStringParams()

onMounted(async () => {
  await store.getAllMenus(menuParams.value)
  await store.getResources()

  window.scrollTo(0, 0)
})

const handleUpdatedData = (data) => {
  store.$patch({ data: data })
  window.scrollTo(0, 290)
}

watch(
  () => route.query,
  async () => await store.getAllMenus(menuParams.value)
)
</script>

<template>
  <AppLayout>
    <section class="background" data-aos="zoom-out" data-aos-duration="1000">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">Our Foods Menu</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">Menus</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-5">
        <div class="bg-white border p-5 rounded-md" data-aos="zoom-in" data-aos-duration="1000">
          <div class="flex items-center justify-between">
            <div class="w-[350px]">
              <FilterSearchBox placeholder="Search menu..." />
            </div>
            <div class="space-x-5">
              <FilterByCategory :options="categories ?? {}" />

              <MenuFilterByRating />

              <MenuSortBy />
            </div>
          </div>
        </div>

        <!-- Filtered By -->
        <MenuFilteredByTags :total="menus?.total" />

        <div v-if="menus.data?.length">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <ProductCard
              v-for="menu in menus.data"
              :key="menu?.id"
              :product="menu"
              data-aos="fade-in"
              data-aos-duration="1000"
            />
          </div>

          <div class="flex items-center justify-center mt-14">
            <Pagination :data="menus" @updatedData="handleUpdatedData" />
          </div>
        </div>
        <div v-else class="py-20">
          <p class="text-center font-bold text-md text-red-600">
            <i class="fa-solid fa-file-circle-xmark"></i>
            "We're sorry we can't find any matches for your filter term.
          </p>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('../../../assets/images/menu-cover.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
