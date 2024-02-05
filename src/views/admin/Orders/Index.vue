<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import Table from '@/components/Tables/Table.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataFilterByStatus from '@/components/Forms/SelectBoxs/DashboardTableDataFilterByStatus.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import SortableTableHeaderCell from '@/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '@/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '@/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '@/components/Tables/TableCells/TableActionCell.vue'
import NoTableData from '@/components/Tables/NoTableData.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import SlateBadge from '@/components/Badges/SlateBadge.vue'
import BlueBadge from '@/components/Badges/BlueBadge.vue'
import OrangeBadge from '@/components/Badges/OrangeBadge.vue'
import RouterLinkButton from '@/components/Buttons/RouterLinkButton.vue'
import ResetFilterButton from '@/components/Buttons/ResetFilterButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useOrderStore } from '@/stores/dashboard/order'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

useTitle('Customer Orders - Restaurant Food Ordering')

const route = useRoute()
const store = useOrderStore()

const { orders } = storeToRefs(store)
const { formatAmount } = useFormatFunctions()
const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllOrders(dashboardParams.value))

watch(
  () => route.query,
  async () => await store.getAllOrders(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.orders.index" icon="fa-cart-plus" label="Customer Orders">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by invoice or order number" />
          <div class="flex items-center justify-end w-full space-x-3">
            <DashboardTableDataFilterByStatus
              :options="[
                {
                  label: 'Pending',
                  value: 'pending'
                },
                {
                  label: 'Confirmed',
                  value: 'confirmed'
                },
                {
                  label: 'Cancelled',
                  value: 'cancelled'
                },
                {
                  label: 'On Delivery',
                  value: 'on_delivery'
                },
                {
                  label: 'Delivered',
                  value: 'delivered'
                }
              ]"
              :selected="route.query?.status ?? ''"
              placeholder="Filter by order status"
            />

            <DashboardTableDataPerPageSelectBox />

            <ResetFilterButton :disabled="!route.query?.status && !route.query?.search" />
          </div>
        </div>

        <TableContainer>
          <Table :items="orders.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />
              <SortableTableHeaderCell label="Order No" sort="order_no" />
              <TableHeaderCell label="Customer" />
              <TableHeaderCell label="Invoice" />
              <SortableTableHeaderCell label="Product Qty" sort="product_qty" />
              <SortableTableHeaderCell label="Total Amount" sort="total_amount" />
              <TableHeaderCell label="Shipping Method" sort="shipping_method" />
              <TableHeaderCell label="Payment Method" />
              <SortableTableHeaderCell label="Payment Status" sort="payment_status" />
              <TableHeaderCell label="Purchased Date" />
              <SortableTableHeaderCell label="Order Status" sort="status" />
              <SortableTableHeaderCell label="Order Date" sort="status" />
              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableDataCell>
                {{ item?.order_no }}
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[120px]">
                  {{ item?.user?.name }}
                </div>
              </TableDataCell>

              <TableDataCell>
                {{ item?.invoice_no }}
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[100px]">
                  {{ item?.product_qty }}
                </div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[100px]">$ {{ formatAmount(item?.total_amount) }}</div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[120px]">
                  {{ item?.shipping_method }}
                </div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[120px]">
                  {{ item?.payment_method }}
                </div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[120px]">
                  <BlueBadge v-show="item?.payment_status === 'pending'">
                    <i class="fa-solid fa-spinner animate-spin"></i>
                    {{ item?.payment_status }}
                  </BlueBadge>
                  <GreenBadge v-show="item?.payment_status === 'completed'">
                    <i class="fa-solid fa-circle-check animate-pulse"></i>
                    {{ item?.payment_status }}
                  </GreenBadge>
                </div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[120px]">
                  {{ item?.purchased_at ?? '-' }}
                </div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[120px]">
                  <BlueBadge v-show="item?.status === 'pending'">
                    <i class="fa-solid fa-spinner animate-spin"></i>
                    {{ item?.status }}
                  </BlueBadge>
                  <GreenBadge v-show="item?.status === 'confirmed'">
                    <i class="fa-solid fa-circle-check animate-pulse"></i>
                    {{ item?.status }}
                  </GreenBadge>
                  <OrangeBadge v-show="item?.status === 'on_delivery'">
                    <i class="fa-solid fa-truck-fast animate-pulse"></i>
                    on delivery
                  </OrangeBadge>
                  <SlateBadge v-show="item?.status === 'delivered'">
                    <i class="fa-solid fa-truck-ramp-box animate-pulse"></i>
                    {{ item?.status }}
                  </SlateBadge>
                </div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[120px]">
                  {{ item?.created_at }}
                </div>
              </TableDataCell>

              <TableActionCell>
                <RouterLinkButton
                  v-show="can('orders.edit')"
                  to="admin.orders.show"
                  :targetIdentifier="{ uuid: item.uuid }"
                >
                  <i class="fa-solid fa-eye"></i>
                  Detail
                </RouterLinkButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="orders" />

        <NoTableData v-show="!orders?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
