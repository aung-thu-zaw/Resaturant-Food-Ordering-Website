<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import { onMounted, reactive } from 'vue'
import { useTableStore } from '@/stores/dashboard/table'

useTitle('Edit Table - Restaurant Food Ordering')

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useTableStore()
const form = reactive({ name: '', capacity: '' })

onMounted(async () => {
  await store.getTable(props.slug)

  form.name = store.table?.name
  form.capacity = store.table?.capacity
})

const handleUpdateTable = async () => await store.updateTable({ ...form }, props.slug)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.tables.index" icon="fa-calendar-week" label="Tables">
          <BreadcrumbItem :label="store.table ? store.table?.name : ''" />
          <BreadcrumbItem label="Edit" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleUpdateTable" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Table Name" required />

            <InputField
              type="text"
              name="table-name"
              placeholder="Enter Table Name ( Eg. Table 1 )"
              required
              v-model="form.name"
            />

            <InputError :message="store.errors?.name" />
          </div>

          <div>
            <InputLabel label="Capacity" required />

            <InputField
              type="number"
              name="table-capacity"
              placeholder="Enter Table Capacity"
              required
              v-model="form.capacity"
            />

            <InputError :message="store.errors?.capacity" />
          </div>

          <div class="flex items-center justify-end w-full space-x-5">
            <FormButton class="w-[150px] text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              <i class="fa-solid fa-save"></i>
              Save Changes
            </FormButton>
          </div>
        </form>
      </div>
      <!-- Form End -->
    </div>
  </DashboardLayout>
</template>
