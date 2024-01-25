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
import OrangeBadge from '@/components/Badges/OrangeBadge.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import RouterLinkButton from '@/components/Buttons/RouterLinkButton.vue'
import { useTitle } from '@vueuse/core'
import { useAssignRolePermissionStore } from '@/stores/dashboard/assignRolePermissions'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'

useTitle('Assign Role Permissions - Restaurant Food Ordering')

const route = useRoute()
const store = useAssignRolePermissionStore()

const { rolesWithPermissions } = storeToRefs(store)
const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllAssignRolePermissions(dashboardParams.value))

watch(
  () => route.query,
  async () => await store.getAllAssignRolePermissions(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb And Trash Button  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.dashboard" icon="fa-shield" label="Assign Role Permissions">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <!-- Table Start -->
      <div class="border border-gray-300 bg-white rounded-md shadow-sm shadow-gray-200 px-5 py-3">
        <div
          class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1"
        >
          <DashboardTableDataSearchBox placeholder="Search by role" />
          <div class="flex items-center justify-end w-full md:space-x-3">
            <DashboardTableDataPerPageSelectBox />
          </div>
        </div>

        <TableContainer>
          <Table :items="rolesWithPermissions.data ?? []">
            <!-- Table Header -->
            <template #table-header>
              <SortableTableHeaderCell label="# Id" sort="id" />

              <SortableTableHeaderCell label="Role" sort="name" />

              <TableHeaderCell label="Permissions" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.id }}
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[150px]">
                  {{ item?.name }}
                </div>
              </TableDataCell>

              <TableDataCell class="max-w-[600px]">
                <div
                  v-if="item?.permissions.length"
                  class="min-w-[800px] overflow-scroll flex items-center space-x-2 py-3"
                >
                  <OrangeBadge v-for="permission in item?.permissions" :key="permission.id">
                    {{ permission.name }}
                  </OrangeBadge>
                </div>
                <div v-else>
                  <p class="text-primary text-xs font-bold">
                    {{ item?.name }} role doesn't have any permission.
                  </p>
                </div>
              </TableDataCell>

              <TableActionCell>
                <RouterLinkButton
                  v-show="can('assign-role-permissions.edit')"
                  to="admin.assign-role-permissions.edit"
                  :targetIdentifier="{ id: item.id }"
                >
                  <i class="fa-solid fa-key"></i>
                  {{ item?.permissions.length ? 'Change Permissions' : 'Add Permissions' }}
                </RouterLinkButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="rolesWithPermissions" />

        <NoTableData v-show="!rolesWithPermissions?.data?.length" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
