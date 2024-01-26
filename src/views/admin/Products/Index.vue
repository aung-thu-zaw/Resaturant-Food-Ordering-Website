<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import Table from '@/components/Tables/Table.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataFilterByStatus from '@/components/Forms/SelectBoxs/DashboardTableDataFilterByStatus.vue'
import DashboardTableDataFilterByCategory from '@/components/Forms/SelectBoxs/DashboardTableDataFilterByCategory.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import SortableTableHeaderCell from '@/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '@/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '@/components/Tables/TableCells/TableDataCell.vue'
import TableImageCell from '@/components/Tables/TableCells/TableImageCell.vue'
import TableActionCell from '@/components/Tables/TableCells/TableActionCell.vue'
import TableSelectBoxCell from '@/components/Tables/TableCells/TableSelectBoxCell.vue'
import NoTableData from '@/components/Tables/NoTableData.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import OrangeBadge from '@/components/Badges/OrangeBadge.vue'
import RedBadge from '@/components/Badges/RedBadge.vue'
import RouterLinkButton from '@/components/Buttons/RouterLinkButton.vue'
import ResetFilterButton from '@/components/Buttons/ResetFilterButton.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useProductStore } from '@/stores/dashboard/product'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

useTitle('Products - Restaurant Food Ordering')

const route = useRoute()
const store = useProductStore()
const swal = inject('$swal')

const { products, categories } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()
const { formatAmount } = useFormatFunctions()

onMounted(async () => {
  await store.getAllProducts(dashboardParams.value)

  await store.getResources()
})

const handleStatusChange = async (slug, event) => await store.changeStatus(slug, event.target.value)

const handleDeleteProduct = async (productSlug) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Product',
    text: 'Are you sure you would like to do this?',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d52222',
    cancelButtonColor: '#626262',
    timer: 20000,
    timerProgressBar: true,
    reverseButtons: true
  })

  if (result.isConfirmed) {
    await store.deleteProduct(productSlug)
  }
}

watch(
  () => route.query,
  async () => await store.getAllProducts(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb And Trash Button  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.products.index" icon="fa-utensils" label="Products">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <div class="flex items-center justify-end mb-3 space-x-3">
        <!-- Create New Button -->
        <RouterLinkButton v-show="can('products.create')" to="admin.products.create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Add A New Product
        </RouterLinkButton>

        <RouterLinkButton
          v-show="can('products.create')"
          to="admin.products.create"
          class="bg-orange-600 text-white hover:bg-orange-700"
        >
          <i class="fa-solid fa-file-import mr-1"></i>
          Import
        </RouterLinkButton>

        <RouterLinkButton
          v-show="can('products.create')"
          to="admin.products.create"
          class="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <i class="fa-solid fa-file-export mr-1"></i>
          Export
        </RouterLinkButton>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by product name" />
          <div class="flex items-center justify-end w-full space-x-3">
            <DashboardTableDataFilterByCategory
              :options="categories ?? {}"
              :selected="route.query?.category ?? ''"
            />

            <DashboardTableDataFilterByStatus
              :options="[
                {
                  label: 'Draft',
                  value: 'draft'
                },
                {
                  label: 'Published',
                  value: 'published'
                },
                {
                  label: 'Hidden',
                  value: 'hidden'
                }
              ]"
              :selected="route.query?.status ?? ''"
            />

            <DashboardTableDataPerPageSelectBox />

            <ResetFilterButton
              :disabled="!route.query.status && !route.query.category && !route.query.search"
            />
          </div>
        </div>

        <TableContainer>
          <Table :items="products.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <TableHeaderCell label="Image" />

              <TableHeaderCell label="Category Name" />

              <SortableTableHeaderCell label="Product Name" sort="name" />

              <SortableTableHeaderCell label="Stock" sort="qty" />

              <SortableTableHeaderCell label="Price" sort="base_price" />

              <SortableTableHeaderCell label="Discount" sort="discount_price" />

              <SortableTableHeaderCell label="Status" sort="status" />

              <TableHeaderCell v-show="can('products.edit')" label="Change Status" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableImageCell :src="item?.image" />

              <TableDataCell class="min-w-[120px]">
                {{ item?.category?.name }}
              </TableDataCell>

              <TableDataCell class="min-w-[200px]">
                <span class="line-clamp-1">
                  {{ item?.name }}
                </span>
              </TableDataCell>

              <TableDataCell class="min-w-[100px]">
                {{ item?.qty }}
              </TableDataCell>

              <TableDataCell class="min-w-[100px]">
                $ {{ formatAmount(item?.base_price) }}
              </TableDataCell>

              <TableDataCell class="min-w-[100px]">
                {{ item?.discount_price ? '$' + formatAmount(item?.discount_price) : '-' }}
              </TableDataCell>

              <TableDataCell>
                <OrangeBadge v-show="item?.status === 'draft'">
                  <i class="fa-solid fa-file animate-pulse"></i>
                  {{ item.status }}
                </OrangeBadge>
                <GreenBadge v-show="item?.status === 'published'">
                  <i class="fa-solid fa-circle-check animate-pulse"></i>
                  {{ item.status }}
                </GreenBadge>
                <RedBadge v-show="item?.status === 'hidden'">
                  <i class="fa-solid fa-eye-slash animate-pulse"></i>
                  {{ item.status }}
                </RedBadge>
              </TableDataCell>

              <TableSelectBoxCell
                v-show="can('products.edit')"
                @change="handleStatusChange(item.slug, $event)"
                :options="[
                  {
                    label: 'Publish',
                    value: 'published'
                  },
                  {
                    label: 'Hidden',
                    value: 'hidden'
                  }
                ]"
                :selected="item.status !== 'draft' ? item.status : ''"
              />

              <TableActionCell>
                <RouterLinkButton
                  v-show="can('products.edit')"
                  to="admin.products.edit"
                  :targetIdentifier="{ slug: item.slug }"
                >
                  <i class="fa-solid fa-edit"></i>
                  Edit
                </RouterLinkButton>

                <NormalButton
                  v-show="can('products.delete')"
                  @click="handleDeleteProduct(item.slug)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="products" />

        <NoTableData v-show="!products?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
