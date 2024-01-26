<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import Table from '@/components/Tables/Table.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import DashboardTableDataFilterByResponse from '@/components/Forms/SelectBoxs/DashboardTableDataFilterByResponse.vue'
import SortableTableHeaderCell from '@/components/Tables/TableCells/SortableTableHeaderCell.vue'
import TableHeaderCell from '@/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '@/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '@/components/Tables/TableCells/TableActionCell.vue'
import TableImageCell from '@/components/Tables/TableCells/TableImageCell.vue'
import NoTableData from '@/components/Tables/NoTableData.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import OrangeBadge from '@/components/Badges/OrangeBadge.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import ResetFilterButton from '@/components/Buttons/ResetFilterButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useBlogCommentStore } from '@/stores/dashboard/blogComment'
import { storeToRefs } from 'pinia'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'

useTitle('Blog Comments - Restaurant Food Ordering')

const route = useRoute()
const swal = inject('$swal')
const store = useBlogCommentStore()

const { blogComments } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllBlogComments(dashboardParams.value))

const handleDeleteBlogComment = async (blogCommentId) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Blog Comment',
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
    await store.deleteBlogComment(blogCommentId)
  }
}

watch(
  () => route.query,
  async () => await store.getAllBlogComments(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb And Trash Button  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.blog-comments.index" icon="fa-pen-nib" label="Blog Comments">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by blog title or commenter" />
          <div class="flex items-center justify-end w-full space-x-3">
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

            <ResetFilterButton :disabled="!route.query?.search && !route.query?.response" />
          </div>
        </div>

        <TableContainer>
          <Table :items="blogComments.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <TableHeaderCell label="Image" />

              <TableHeaderCell label="Blog Title" />

              <TableHeaderCell label="Commenter" />

              <SortableTableHeaderCell label="Comment" sort="comment" />

              <SortableTableHeaderCell label="Response Status" sort="response_status" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableImageCell :src="item?.blog_content?.thumbnail" />

              <TableDataCell class="min-w-[250px]">
                <span class="line-clamp-1">
                  {{ item?.blog_content?.title }}
                </span>
              </TableDataCell>

              <TableDataCell class="min-w-[150px]">
                {{ item?.user?.name }}
              </TableDataCell>

              <TableDataCell class="min-w-[300px]">
                <span class="line-clamp-1">
                  {{ item?.comment }}
                </span>
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

              <TableActionCell class="min-w-[300px]">
                <NormalButton v-show="can('blog-comments.response')">
                  <i class="fa-solid fa-star"></i>
                  Go To Comment
                </NormalButton>

                <NormalButton
                  v-show="can('blog-comments.delete')"
                  @click="handleDeleteBlogComment(item.id)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="blogComments" />

        <NoTableData v-show="!blogComments?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
