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
import { useCouponStore } from '@/stores/dashboard/coupon'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

useTitle('Coupons - Restaurant Food Ordering')

const route = useRoute()
const swal = inject('$swal')
const store = useCouponStore()

const { coupons } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()
const { formatToTitleCase, formatAmount } = useFormatFunctions()

onMounted(async () => await store.getAllCoupons(dashboardParams.value))

const handleStatusChange = async (slug, event) => await store.changeStatus(slug, event.target.value)

const handleDeleteCoupon = async (couponSlug) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Coupon',
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
    await store.deleteCoupon(couponSlug)
  }
}

watch(
  () => route.query,
  async () => await store.getAllCoupons(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb And Trash Button  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.dashboard" icon="fa-ticket" label="Coupons">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <div class="flex items-center justify-end mb-3">
        <!-- Create New Button -->
        <RouterLinkButton v-show="can('coupons.create')" to="admin.coupons.create">
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Add A New Coupon
        </RouterLinkButton>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by coupon code" />
          <div class="flex items-center justify-end w-full md:space-x-3">
            <DashboardTableDataPerPageSelectBox />
          </div>
        </div>

        <TableContainer>
          <Table :items="coupons.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <SortableTableHeaderCell label="Coupon Code" sort="code" />

              <SortableTableHeaderCell label="Coupon Type" sort="type" />

              <SortableTableHeaderCell label="Discount Amount" sort="discount_amount" />

              <SortableTableHeaderCell label="Minimum Order Amount" sort="minimum_order_amount" />

              <SortableTableHeaderCell label="Free Item Quantity" sort="free_item_quantity" />

              <SortableTableHeaderCell label="Coupon Validity Period" sort="validity_period" />

              <SortableTableHeaderCell label="Start Date" sort="start_date" />

              <SortableTableHeaderCell label="End Date" sort="end_date" />

              <SortableTableHeaderCell label="Status" sort="status" />

              <TableHeaderCell label="Change Status" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                {{ item?.code }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                {{ formatToTitleCase(item?.type) }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                {{ item?.discount_amount ? '$' + formatAmount(item?.discount_amount) : '-' }}
              </TableDataCell>

              <TableDataCell class="min-w-[165px]">
                {{
                  item?.minimum_order_amount ? '$' + formatAmount(item?.minimum_order_amount) : '-'
                }}
              </TableDataCell>

              <TableDataCell class="min-w-[130px]">
                {{ item?.free_item_quantity ?? '-' }}
              </TableDataCell>

              <TableDataCell class="min-w-[160px]">
                {{ formatToTitleCase(item?.validity_period) }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                {{ item?.start_date }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                {{ item?.end_date }}
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                <GreenBadge v-show="item?.status === 'active'">
                  <i class="fa-solid fa-circle-check animate-pulse"></i>
                  {{ item.status }}
                </GreenBadge>
                <RedBadge v-show="item?.status === 'inactive'">
                  <i class="fa-solid fa-circle-xmark animate-pulse"></i>
                  {{ item.status }}
                </RedBadge>
              </TableDataCell>

              <TableSelectBoxCell
                @change="handleStatusChange(item.slug, $event)"
                :options="[
                  {
                    label: 'Active',
                    value: 'active'
                  },
                  {
                    label: 'Inactive',
                    value: 'inactive'
                  }
                ]"
                :selected="item.status"
              />

              <TableActionCell>
                <RouterLinkButton
                  v-show="can('coupons.edit')"
                  to="admin.coupons.edit"
                  :targetIdentifier="{ slug: item.slug }"
                >
                  <i class="fa-solid fa-edit"></i>
                  Edit
                </RouterLinkButton>

                <NormalButton
                  v-show="can('coupons.delete')"
                  @click="handleDeleteCoupon(item.slug)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="coupons" />

        <NoTableData v-show="!coupons?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
