<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import MenuStockCard from '@/components/Cards/MenuStockCard.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import { useTitle } from '@vueuse/core'

useTitle('Menu Stock - Restaurant Food Ordering')
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
            <div>
              <select
                id="filter-by-category"
                class="p-3 py-3.5 font-medium text-xs text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
              >
                <option selected disabled>Filter By Menu Category</option>
                <option value="5">Main Courses</option>
                <option value="5">Salads</option>
                <option value="5">Seafood</option>
                <option value="5">Desserts</option>
                <option value="5">Breakfast</option>
                <option value="5">Kids Menu</option>
                <option value="5">Burgers</option>
                <option value="5">Pasta</option>
                <option value="5">Vegetarian</option>
                <option value="5">Drinks</option>
              </select>
            </div>

            <div>
              <select
                id="filter-by-stock"
                class="p-3 py-3.5 font-medium text-xs text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
              >
                <option selected disabled>Filter By Stock</option>
                <option value="5">Out Of Stock</option>
                <option value="5">In Stock</option>
                <option value="10">Less Than 10 Stock</option>
                <option value="10">Less Than 5 Stock</option>
              </select>
            </div>

            <div>
              <select
                id="sort-by"
                class="p-3 py-3.5 font-medium text-xs text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
              >
                <option selected disabled>Sort By</option>
                <option value="5">Low To High Stock</option>
                <option value="10">High To Low Stock</option>
              </select>
            </div>

            <DashboardTableDataPerPageSelectBox />
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 rounded-md border border-gray-300 bg-white"
      >
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
        <MenuStockCard />
      </div>
    </div>
  </DashboardLayout>
</template>
