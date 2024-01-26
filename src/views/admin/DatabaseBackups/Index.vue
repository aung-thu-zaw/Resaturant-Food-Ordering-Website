<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import TableContainer from '@/components/Tables/TableContainer.vue'
import Table from '@/components/Tables/Table.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import TableHeaderCell from '@/components/Tables/TableCells/TableHeaderCell.vue'
import TableDataCell from '@/components/Tables/TableCells/TableDataCell.vue'
import TableActionCell from '@/components/Tables/TableCells/TableActionCell.vue'
import NoTableData from '@/components/Tables/NoTableData.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import RedBadge from '@/components/Badges/RedBadge.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import Pagination from '@/components/Paginations/DashboardPagination.vue'
import { useTitle } from '@vueuse/core'
import { useDatabaseBackupStore } from '@/stores/dashboard/databaseBackup'
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryStringParams } from '@/composables/useQueryStringParams'

useTitle('Database Backups - Restaurant Food Ordering')

const route = useRoute()
const store = useDatabaseBackupStore()
const swal = inject('$swal')

const { dashboardParams } = useQueryStringParams()

onMounted(async () => await store.getAllBackups(dashboardParams.value))

const handleCreateANewBackup = async () => {
  await store.createBackup()
  await store.getAllBackups(dashboardParams.value)
}

const handleDownloadBackup = async (filename) => await store.downloadBackup(filename)

const handleDeleteBackup = async (filename) => {
  const result = await swal({
    icon: 'question',
    title: 'Delete Backup File',
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
    await store.deleteBackup(filename)
  }
}

watch(
  () => route.query,
  async () => await store.getAllBackups(dashboardParams.value)
)
</script>

<template>
  <DashboardLayout>
    <!-- Breadcrumb  -->
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.database-backups.index" icon="fa-database" label="Database Backups">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <div class="border bg-white rounded-md shadow px-5 pt-6 mb-5">
        <TableContainer>
          <Table :items="store?.overallInformation ? [store.overallInformation] : []">
            <!-- Table Header -->
            <template #table-header>
              <TableHeaderCell label="Disk" />

              <TableHeaderCell label="Disk Health" />

              <TableHeaderCell label="Total Backups" />

              <TableHeaderCell label="Last Time Backup" />

              <TableHeaderCell label="Used Storage" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.disk }}
              </TableDataCell>
              <TableDataCell>
                <GreenBadge v-show="item.health === 'Healthy'">
                  <i class="fa-solid fa-circle-check"></i>
                  {{ item.health }}
                </GreenBadge>
                <RedBadge v-show="item.health === 'Not Healthy'">
                  <i class="fa-solid fa-circle-xmar"></i>
                  {{ item.health }}
                </RedBadge>
              </TableDataCell>

              <TableDataCell>
                {{ item?.amountOfBackups }}
              </TableDataCell>

              <TableDataCell>
                {{ item?.lastTimeBackup }}
              </TableDataCell>

              <TableDataCell>
                {{ item?.usedBackupStorage }}
              </TableDataCell>
            </template>
          </Table>
        </TableContainer>
      </div>

      <!-- Table Start -->
      <div class="border bg-white rounded-md shadow px-5 py-3">
        <div class="my-3 flex items-center justify-between overflow-auto w-full p-2">
          <!-- Create New Button -->
          <div class="w-full">
            <NormalButton @click="handleCreateANewBackup" v-show="can('database-backups.create')">
              <i class="fa-solid fa-file-circle-plus mr-1"></i>
              Create A New Backup
            </NormalButton>
          </div>

          <div class="flex items-center justify-end w-full md:space-x-5">
            <DashboardTableDataPerPageSelectBox />
          </div>
        </div>

        <TableContainer>
          <Table :items="store.backups ? store.backups?.data : {}">
            <!-- Table Header -->
            <template #table-header>
              <TableHeaderCell label="Location" />

              <TableHeaderCell label="File Name" />

              <TableHeaderCell label="Size" />

              <TableHeaderCell label="Created At" />

              <TableHeaderCell label="Actions" />
            </template>

            <!-- Table Body -->
            <template #table-data="{ item }">
              <TableDataCell>
                {{ item?.location }}
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[200px]">
                  {{ item?.filename }}
                </div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[100px]">
                  {{ item?.size }}
                </div>
              </TableDataCell>

              <TableDataCell>
                <div class="min-w-[250px]">
                  {{ item?.date }}
                </div>
              </TableDataCell>

              <TableActionCell>
                <NormalButton
                  v-show="can('database-backups.download')"
                  @click="handleDownloadBackup(item.filename)"
                  class="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <i class="fa-solid fa-download"></i>
                  Download
                </NormalButton>

                <NormalButton
                  v-show="can('database-backups.delete')"
                  @click="handleDeleteBackup(item.filename)"
                  class="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </NormalButton>
              </TableActionCell>
            </template>
          </Table>
        </TableContainer>

        <Pagination :data="store?.backups" />

        <NoTableData v-show="!store.backups?.data" />
      </div>
      <!-- Table End -->
    </div>
  </DashboardLayout>
</template>
