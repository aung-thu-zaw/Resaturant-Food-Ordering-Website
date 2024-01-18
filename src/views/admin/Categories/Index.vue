<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import ActionTable from '@/components/Tables/ActionTable.vue'
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
import BulkActionButton from '@/components/Buttons/BulkActionButton.vue'
import RouterLinkButton from '@/components/Buttons/RouterLinkButton.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { reactive } from 'vue'

useTitle('Categories - Restaurant Food Ordering')

const categories = reactive({
  current_page: 1,
  data: [
    {
      id: 167,
      parent_id: 45,
      name: 'quod',
      slug: 'quod',
      image: 'https://via.placeholder.com/640x480.png/00ffff?text=ut',
      status: 'show',
      deleted_at: null,
      created_at: '2024-01-09T19:13:41.000000Z',
      updated_at: '2024-01-11T02:49:56.000000Z'
    },
    {
      id: 166,
      parent_id: 28,
      name: 'aliquid',
      slug: 'aliquid',
      image: 'https://via.placeholder.com/640x480.png/007744?text=fuga',
      status: 'show',
      deleted_at: null,
      created_at: '2023-11-24T17:33:18.000000Z',
      updated_at: '2024-01-11T02:49:56.000000Z'
    },
    {
      id: 165,
      parent_id: 34,
      name: 'dolorem',
      slug: 'dolorem',
      image: 'https://via.placeholder.com/640x480.png/005544?text=quis',
      status: 'show',
      deleted_at: null,
      created_at: '2023-11-02T00:33:43.000000Z',
      updated_at: '2024-01-11T02:49:56.000000Z'
    },
    {
      id: 164,
      parent_id: 26,
      name: 'doloremque',
      slug: 'doloremque',
      image: 'https://via.placeholder.com/640x480.png/002299?text=neque',
      status: 'show',
      deleted_at: null,
      created_at: '2023-09-15T23:02:49.000000Z',
      updated_at: '2024-01-11T02:49:56.000000Z'
    },
    {
      id: 163,
      parent_id: 61,
      name: 'dolorum',
      slug: 'dolorum',
      image: 'https://via.placeholder.com/640x480.png/0077dd?text=iste',
      status: 'show',
      deleted_at: null,
      created_at: '2023-10-17T15:44:37.000000Z',
      updated_at: '2024-01-11T02:49:56.000000Z'
    }
  ],
  first_page_url:
    'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=1',
  from: 1,
  last_page: 34,
  last_page_url:
    'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=34',
  links: [
    { url: null, label: '&laquo; Previous', active: false },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=1',
      label: '1',
      active: true
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=2',
      label: '2',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=3',
      label: '3',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=4',
      label: '4',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=5',
      label: '5',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=6',
      label: '6',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=7',
      label: '7',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=8',
      label: '8',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=9',
      label: '9',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=10',
      label: '10',
      active: false
    },
    { url: null, label: '...', active: false },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=33',
      label: '33',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=34',
      label: '34',
      active: false
    },
    {
      url: 'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=2',
      label: 'Next &raquo;',
      active: false
    }
  ],
  next_page_url:
    'https://multi-seller-ecommerce-platform.test/admin/categories?per_page=5&sort=id&direction=desc&page=2',
  path: 'https://multi-seller-ecommerce-platform.test/admin/categories',
  per_page: 5,
  prev_page_url: null,
  to: 5,
  total: 167
})
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
          <DashboardTableDataSearchBox to="admin.dashboard" />

          <div class="flex items-center justify-end w-full md:space-x-3">
            <DashboardTableDataPerPageSelectBox to="admin.dashboard" />
          </div>
        </div>

        <TableContainer>
          <ActionTable :items="categories.data">
            <!-- Table Actions -->
            <template #bulk-actions="{}">
              <BulkActionButton class="text-red-600">
                <i class="fa-solid fa-trash-can"></i>
                Delete Selected (5)
              </BulkActionButton>
            </template>

            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" to="admin.dashboard" sort="id" />

              <SortableTableHeaderCell label="Category Name" to="admin.dashboard" sort="name" />

              <SortableTableHeaderCell label="Status" to="admin.dashboard" sort="status" />

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
                <GreenBadge v-show="item?.status === 'show'">
                  <i class="fa-solid fa-eye animate-pulse"></i>
                  {{ item?.status }}
                </GreenBadge>
                <RedBadge v-show="item?.status === 'hide'">
                  <i class="fa-solid fa-eye-slash animate-pulse"></i>
                  {{ item?.status }}
                </RedBadge>
              </TableDataCell>

              <TableSelectBoxCell />

              <TableActionCell>
                <RouterLinkButton to="admin.dashboard">
                  <i class="fa-solid fa-edit"></i>
                  Edit
                </RouterLinkButton>

                <NormalButton class="bg-red-600 hover:bg-red-700 text-white">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </ActionTable>
        </TableContainer>

        <Pagination :data="categories" />

        <NoTableData v-show="!categories.data.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
