<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import Table from '@/components/Tables/Table.vue'
import TableImageCell from '@/components/Tables/TableCells/TableImageCell.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataFilterByStatus from '@/components/Forms/SelectBoxs/DashboardTableDataFilterByStatus.vue'
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
import ResetFilterButton from '@/components/Buttons/ResetFilterButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useAdminManageStore } from '@/stores/dashboard/adminManage'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'

useTitle('Admin Manage - Restaurant Food Ordering')

const route = useRoute()
const store = useAdminManageStore()
const swal = inject('$swal')

const { admins } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllAdmins(dashboardParams.value))

const handleDeleteAdmin = async (adminId) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Admin Account',
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
    await store.deleteAdmin(adminId)
  }
}

const handleStatusChange = async (id, event) => await store.changeStatus(id, event.target.value)

watch(
  () => route.query,
  async () => await store.getAllAdmins(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.admin-manage.index" icon="fa-user-gear" label="Admin Manage">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <div class="flex items-center justify-end mb-3">
        <!-- Create New Button -->
        <RouterLinkButton v-show="can('admin-manage.create')" to="admin.admin-manage.create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Add A New Admin
        </RouterLinkButton>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by name or email" />
          <div class="flex items-center justify-end w-full space-x-3">
            <DashboardTableDataFilterByStatus
              :options="[
                {
                  label: 'Active',
                  value: 'active'
                },
                {
                  label: 'Suspended',
                  value: 'suspended'
                }
              ]"
              :selected="route.query?.status ?? ''"
            />

            <DashboardTableDataPerPageSelectBox />

            <ResetFilterButton :disabled="!route.query?.status && !route.query?.search" />
          </div>
        </div>

        <TableContainer>
          <Table :items="admins.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <TableHeaderCell label="Avatar" />

              <SortableTableHeaderCell label="Name" sort="name" />

              <SortableTableHeaderCell label="Email" sort="email" />

              <SortableTableHeaderCell label="Phone" sort="phone" />

              <SortableTableHeaderCell label="Status" sort="status" />

              <TableHeaderCell label="Change Status" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableImageCell :src="item.avatar" />

              <TableDataCell class="min-w-[150px]">
                {{ item?.name }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                {{ item?.email }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                {{ item?.phone }}
              </TableDataCell>

              <TableDataCell>
                <GreenBadge v-show="item?.status === 'active'">
                  <i class="fa-solid fa-circle-check animate-pulse"></i>
                  {{ item.status }}
                </GreenBadge>
                <RedBadge v-show="item?.status === 'suspended'">
                  <i class="fa-solid fa-circle-xmark animate-pulse"></i>
                  {{ item.status }}
                </RedBadge>
              </TableDataCell>

              <TableSelectBoxCell
                @change="handleStatusChange(item.id, $event)"
                :options="[
                  {
                    label: 'Active',
                    value: 'active'
                  },
                  {
                    label: 'Suspended',
                    value: 'suspended'
                  }
                ]"
                :selected="item.status"
              />

              <TableActionCell>
                <RouterLinkButton
                  v-show="can('admin-manage.edit')"
                  to="admin.admin-manage.edit"
                  :targetIdentifier="{ id: item.id }"
                >
                  <i class="fa-solid fa-edit"></i>
                  Edit
                </RouterLinkButton>

                <NormalButton
                  v-show="can('admin-manage.delete')"
                  @click="handleDeleteAdmin(item.id)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="admins" />

        <NoTableData v-show="!admins?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
