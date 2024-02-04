<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import MenuStockCard from '@/components/Cards/MenuStockCard.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import FilterByCategory from '@/components/Forms/SelectBoxs/FilterByCategory.vue'
import SortByStock from '@/components/Forms/SelectBoxs/SortByStock.vue'
import StockFilteredByTags from '@/components/StockFilteredByTags.vue'
import { useTitle } from '@vueuse/core'
import { useMenuStockStore } from '@/stores/dashboard/menuStock'
import { onMounted, watch } from 'vue'
import { useQueryStringParams } from '@/composables/useQueryStringParams'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

useTitle('Menu Stock - Restaurant Food Ordering')

const route = useRoute()
const store = useMenuStockStore()
const { products, categories } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()

onMounted(async () => {
  await store.getAllPublishedMenu({ ...dashboardParams.value, per_page: 12 })

  await store.getResources()
})

watch(
  () => route.query,
  async () => await store.getAllPublishedMenu({ ...dashboardParams.value, per_page: 12 })
)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10 space-y-5">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb
          to="admin.menu-stock.index"
          icon="fa-wheat-awn-circle-exclamation"
          label="Menu Stock"
        >
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <div class="border border-gray-300 bg-white rounded-md shadow-gray-200 px-5 py-2.5">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1 space-x-3"
        >
          <DashboardTableDataSearchBox placeholder="Search by product name" />

          <div class="space-x-5 flex items-center">
            <FilterByCategory :options="categories ?? {}" />

            <SortByStock />
          </div>
        </div>
      </div>

      <!-- Filtered By -->
      <StockFilteredByTags :total="products?.total" />

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 rounded-md border border-gray-300 bg-white"
      >
        <MenuStockCard v-for="product in products.data" :key="product?.id" :product="product" />
      </div>

      <Pagination :data="products" />
    </div>
  </DashboardLayout>
</template>
