<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import Table from '@/components/Tables/Table.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import DashboardTableDataFilterByStatus from '@/components/Forms/SelectBoxs/DashboardTableDataFilterByStatus.vue'
import SortableTableHeaderCell from '@/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '@/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '@/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '@/components/Tables/TableCells/TableActionCell.vue'
import NoTableData from '@/components/Tables/NoTableData.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import RedBadge from '@/components/Badges/RedBadge.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import ResetFilterButton from '@/components/Buttons/ResetFilterButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useSubscriberStore } from '@/stores/dashboard/subscriber'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'

useTitle('Subscribers - Restaurant Food Ordering')

const route = useRoute()
const swal = inject('$swal')
const store = useSubscriberStore()

const { subscribers } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllSubscribers(dashboardParams.value))

const handleDeleteSubscriber = async (subscriberId) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Subscriber',
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
    await store.deleteSubscriber(subscriberId)
  }
}

watch(
  () => route.query,
  async () => await store.getAllSubscribers(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb And Trash Button  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.subscribers.index" icon="fa-envelope-open-text" label="Subscribers">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by email" />
          <div class="flex items-center justify-end w-full space-x-3">
            <DashboardTableDataFilterByStatus
              :options="[
                {
                  label: 'Subscribed',
                  value: 'subscribed'
                },
                {
                  label: 'Unubscribed',
                  value: 'unsubscribed'
                }
              ]"
              :selected="route.query?.status ?? ''"
              placeholder="Filter By Status"
            />

            <DashboardTableDataPerPageSelectBox />

            <ResetFilterButton :disabled="!route.query?.search && !route.query?.status" />
          </div>
        </div>

        <TableContainer>
          <Table :items="subscribers.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <SortableTableHeaderCell label="Email" sort="email" />

              <SortableTableHeaderCell label="Status" sort="status" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableDataCell>
                {{ item?.email }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                <GreenBadge v-show="item?.status === 'subscribed'">
                  <i class="fa-solid fa-circle-check animate-pulse"></i>
                  {{ item.status }}
                </GreenBadge>
                <RedBadge v-show="item?.status === 'unsubscribed'">
                  <i class="fa-solid fa-circle-xmark animate-pulse"></i>
                  {{ item.status }}
                </RedBadge>
              </TableDataCell>

              <TableActionCell>
                <NormalButton
                  v-show="can('subscribers.delete')"
                  @click="handleDeleteSubscriber(item.id)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="subscribers" />

        <NoTableData v-show="!subscribers?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
