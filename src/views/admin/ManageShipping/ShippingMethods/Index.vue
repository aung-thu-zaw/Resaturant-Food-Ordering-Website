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
import NoTableData from '@/components/Tables/NoTableData.vue'
import RouterLinkButton from '@/components/Buttons/RouterLinkButton.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useShippingMethodStore } from '@/stores/dashboard/shippingMethod'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

useTitle('Shipping Methods - Restaurant Food Ordering')

const route = useRoute()
const swal = inject('$swal')
const store = useShippingMethodStore()

const { shippingMethods } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()
const { formatAmount } = useFormatFunctions()

onMounted(async () => await store.getAllShippingMethods(dashboardParams.value))

const handleDeleteShippingMethod = async (shippingMethodSlug) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Shipping Method',
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
    await store.deleteShippingMethod(shippingMethodSlug)
  }
}

watch(
  () => route.query,
  async () => await store.getAllShippingMethods(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb And Trash Button  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.shipping-methods.index" icon="fa-truck-fast" label="Shipping Methods">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <div class="flex items-center justify-end mb-3">
        <!-- Create New Button -->
        <RouterLinkButton
          v-show="can('shipping-methods.create')"
          to="admin.shipping-methods.create"
        >
          <i class="fa-solid fa-file-circle-plus mr-1"></i>
          Add A New Shipping Method
        </RouterLinkButton>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by shipping method" />
          <div class="flex items-center justify-end w-full md:space-x-3">
            <DashboardTableDataPerPageSelectBox />
          </div>
        </div>

        <TableContainer>
          <Table :items="shippingMethods.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <SortableTableHeaderCell label="Shipping Method" sort="name" />

              <SortableTableHeaderCell label="Shipping Cost" sort="cost" />

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

              <TableDataCell> $ {{ formatAmount(item?.cost) }} </TableDataCell>

              <TableActionCell>
                <RouterLinkButton
                  v-show="can('shipping-methods.edit')"
                  to="admin.shipping-methods.edit"
                  :targetIdentifier="{ slug: item.slug }"
                >
                  <i class="fa-solid fa-edit"></i>
                  Edit
                </RouterLinkButton>

                <NormalButton
                  v-show="can('shipping-methods.delete')"
                  @click="handleDeleteShippingMethod(item.slug)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="shippingMethods" />

        <NoTableData v-show="!shippingMethods?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
