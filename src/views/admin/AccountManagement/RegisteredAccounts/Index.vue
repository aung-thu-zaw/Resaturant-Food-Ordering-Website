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
import OrangeBadge from '@/components/Badges/OrangeBadge.vue'
import BlueBadge from '@/components/Badges/BlueBadge.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import ResetFilterButton from '@/components/Buttons/ResetFilterButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useRegisteredAccountStore } from '@/stores/dashboard/registeredAccount'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'

useTitle('Registered Accounts - Restaurant Food Ordering')

const route = useRoute()
const store = useRegisteredAccountStore()
const swal = inject('$swal')

const { registeredAccounts } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllRegisteredAccounts(dashboardParams.value))

const handleDeleteAccount = async (accountId) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Account',
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
    await store.deleteRegisteredAccount(accountId)
  }
}

const handleStatusChange = async (slug, event) => await store.changeStatus(slug, event.target.value)

watch(
  () => route.query,
  async () => await store.getAllRegisteredAccounts(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb
          to="admin.registered-accounts.index"
          icon="fa-user-gear"
          label="Registered Accounts"
        >
          <BreadcrumbItem label="List" />
        </Breadcrumb>
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
          <Table :items="registeredAccounts.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <TableHeaderCell label="Avatar" />

              <SortableTableHeaderCell label="Name" sort="name" />

              <SortableTableHeaderCell label="Email" sort="email" />

              <SortableTableHeaderCell label="Phone" sort="phone" />

              <SortableTableHeaderCell label="Role" sort="role" />

              <SortableTableHeaderCell label="Status" sort="status" />

              <TableHeaderCell v-show="can('registered-accounts.edit')" label="Change Status" />

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

              <TableDataCell class="capitalize">
                <OrangeBadge v-show="item?.role === 'admin'">
                  <i class="fa-solid fa-user-tie animate-pulse"></i>
                  {{ item.role }}
                </OrangeBadge>
                <BlueBadge v-show="item?.role === 'user'">
                  <i class="fa-solid fa-user animate-pulse"></i>
                  {{ item.role }}
                </BlueBadge>
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
                v-show="can('registered-accounts.edit')"
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
                <NormalButton
                  v-show="can('registered-accounts.delete')"
                  @click="handleDeleteAccount(item.id)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="registeredAccounts" />

        <NoTableData v-show="!registeredAccounts?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
