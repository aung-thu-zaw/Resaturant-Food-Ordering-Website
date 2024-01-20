<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import Table from '@/components/Tables/Table.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import SortableTableHeaderCell from '@/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '@/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '@/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '@/components/Tables/TableCells/TableActionCell.vue'
import TableSelectBoxCell from '@/components/Tables/TableCells/TableSelectBoxCell.vue'
import NoTableData from '@/components/Tables/NoTableData.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import RedBadge from '@/components/Badges/RedBadge.vue'
import RouterLinkButton from '@/components/Buttons/RouterLinkButton.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useCategoryStore } from '@/stores/dashboard/category'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'

useTitle('Categories - Restaurant Food Ordering')

const route = useRoute()
const swal = inject('$swal')
const store = useCategoryStore()

const { categories } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllCategories(dashboardParams.value))

const handleStatusChange = async (slug, event) => await store.changeStatus(slug, event.target.value)

const handleDeleteCategory = async (categorySlug) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Category',
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
    await store.deleteCategory(categorySlug)
  }
}

watch(
  () => route.query,
  async () => await store.getAllCategories(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb And Trash Button  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.dashboard" icon="fa-list" label="Categories">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <div class="flex items-center justify-end mb-3">
        <!-- Create New Button -->
        <RouterLinkButton to="admin.categories.create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Add A New Category
        </RouterLinkButton>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox />
          <div class="flex items-center justify-end w-full md:space-x-3">
            <DashboardTableDataPerPageSelectBox />
          </div>
        </div>

        <TableContainer>
          <Table :items="categories.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <SortableTableHeaderCell label="Category Name" sort="name" />

              <SortableTableHeaderCell label="Status" sort="status" />

              <TableHeaderCell label="Change Status" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableDataCell>
                {{ item?.name }}
              </TableDataCell>

              <TableDataCell>
                <GreenBadge v-show="item?.status">
                  <i class="fa-solid fa-eye animate-pulse"></i>
                  show
                </GreenBadge>
                <RedBadge v-show="!item?.status">
                  <i class="fa-solid fa-eye-slash animate-pulse"></i>
                  hide
                </RedBadge>
              </TableDataCell>

              <TableSelectBoxCell
                @change="handleStatusChange(item.slug, $event)"
                :options="[
                  {
                    label: 'Show',
                    value: true
                  },
                  {
                    label: 'Hide',
                    value: false
                  }
                ]"
                :selected="item.status"
              />

              <TableActionCell>
                <RouterLinkButton
                  to="admin.categories.edit"
                  :targetIdentifier="{ slug: item.slug }"
                >
                  <i class="fa-solid fa-edit"></i>
                  Edit
                </RouterLinkButton>

                <NormalButton
                  @click="handleDeleteCategory(item.slug)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="categories" />

        <NoTableData v-show="!categories?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
