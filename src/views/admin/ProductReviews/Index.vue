<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import Table from '@/components/Tables/Table.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import DashboardTableDataFilterByStatus from '@/components/Forms/SelectBoxs/DashboardTableDataFilterByStatus.vue'
import DashboardTableDataFilterByResponse from '@/components/Forms/SelectBoxs/DashboardTableDataFilterByResponse.vue'
import SortableTableHeaderCell from '@/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '@/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '@/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '@/components/Tables/TableCells/TableActionCell.vue'
import TableImageCell from '@/components/Tables/TableCells/TableImageCell.vue'
import TableSelectBoxCell from '@/components/Tables/TableCells/TableSelectBoxCell.vue'
import NoTableData from '@/components/Tables/NoTableData.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import BlueBadge from '@/components/Badges/BlueBadge.vue'
import RedBadge from '@/components/Badges/RedBadge.vue'
import OrangeBadge from '@/components/Badges/OrangeBadge.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import ResetFilterButton from '@/components/Buttons/ResetFilterButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import StarRating from '@/components/Ratings/StarRating.vue'
import { useTitle } from '@vueuse/core'
import { useProductReviewStore } from '@/stores/dashboard/productReview'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'

useTitle('Product Reviews - Restaurant Food Ordering')

const route = useRoute()
const store = useProductReviewStore()
const swal = inject('$swal')

const { productReviews } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllProductReviews(dashboardParams.value))

const handleStatusChange = async (id, event) => await store.changeStatus(id, event.target.value)

const handleDeleteProductReview = async (productReviewId) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Product Review',
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
    await store.deleteProductReview(productReviewId)
  }
}

watch(
  () => route.query,
  async () => await store.getAllProductReviews(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb And Trash Button  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.product-reviews.index" icon="fa-star" label="Product Reviews">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by product name, reviewer" />
          <div class="flex items-center justify-end w-full space-x-3">
            <DashboardTableDataFilterByStatus
              :options="[
                {
                  label: 'Pending',
                  value: 'pending'
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
              placeholder="Filter By Review Status"
            />

            <DashboardTableDataFilterByResponse
              :options="[
                {
                  label: 'Responded',
                  value: 'responded'
                },
                {
                  label: 'Awaiting',
                  value: 'awaiting'
                }
              ]"
              :selected="route.query?.response ?? ''"
              placeholder="Filter By Response Status"
            />

            <DashboardTableDataPerPageSelectBox />

            <ResetFilterButton
              :disabled="!route.query?.status && !route.query?.search && !route.query?.response"
            />
          </div>
        </div>

        <TableContainer>
          <Table :items="productReviews.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <TableHeaderCell label="Image" />

              <TableHeaderCell label="Product Name" />

              <TableHeaderCell label="Reviewer" />

              <SortableTableHeaderCell label="Comment" sort="comment" />

              <SortableTableHeaderCell label="Rating" sort="rating" />

              <SortableTableHeaderCell label="Review Status" sort="status" />

              <SortableTableHeaderCell label="Response Status" sort="response_status" />

              <TableHeaderCell label="Change Status" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableImageCell :src="item?.product?.image" />

              <TableDataCell class="min-w-[200px]">
                <span class="line-clamp-1">
                  {{ item?.product?.name }}
                </span>
              </TableDataCell>

              <TableDataCell class="min-w-[180px]">
                <span class="line-clamp-1">
                  {{ item?.reviewer?.name }}
                </span>
              </TableDataCell>

              <TableDataCell class="min-w-[300px]">
                <span class="line-clamp-1">
                  {{ item?.comment }}
                </span>
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                <StarRating :rating="item?.rating" />
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                <BlueBadge v-show="item?.status === 'pending'">
                  <i class="fa-solid fa-spinner animate-spin"></i>
                  {{ item.status }}
                </BlueBadge>
                <GreenBadge v-show="item?.status === 'published'">
                  <i class="fa-solid fa-circle-check animate-pulse"></i>
                  {{ item.status }}
                </GreenBadge>
                <RedBadge v-show="item?.status === 'hidden'">
                  <i class="fa-solid fa-circle-xmark animate-pulse"></i>
                  {{ item.status }}
                </RedBadge>
              </TableDataCell>

              <TableDataCell class="min-w-[200px]">
                <OrangeBadge v-show="item?.response_status === 'awaiting'">
                  <i class="fa-solid fa-spinner animate-spin"></i>
                  awaiting response
                </OrangeBadge>
                <GreenBadge v-show="item?.response_status === 'responded'">
                  <i class="fa-solid fa-circle-check animate-pulse"></i>
                  {{ item?.response_status }}
                </GreenBadge>
              </TableDataCell>

              <TableSelectBoxCell
                @change="handleStatusChange(item.id, $event)"
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
                :selected="item.status"
              />

              <TableActionCell class="min-w-[300px]">
                <NormalButton v-show="can('product-reviews.response')">
                  <i class="fa-solid fa-star"></i>
                  Go To Review
                </NormalButton>

                <NormalButton
                  v-show="can('product-reviews.delete')"
                  @click="handleDeleteProductReview(item.id)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="productReviews" />

        <NoTableData v-show="!productReviews?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
