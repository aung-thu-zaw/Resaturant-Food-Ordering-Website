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
import { useEmployeePositionStore } from '@/stores/dashboard/employeePosition'

useTitle('Edit Employee Position - Restaurant Food Ordering')

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useEmployeePositionStore()
const form = reactive({ name: '' })

onMounted(async () => {
  await store.getEmployeePosition(props.slug)

  form.name = store.employeePosition?.name
})

const handleUpdateEmployeePosition = async () =>
  await store.updateEmployeePosition({ ...form }, props.slug)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb
          to="admin.employee-positions.index"
          icon="fa-user-tie"
          label="Employee Positions"
        >
          <BreadcrumbItem :label="store.employeePosition ? store.employeePosition?.name : ''" />
          <BreadcrumbItem label="Edit" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleUpdateEmployeePosition" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Employee Position Name" required />

            <InputField
              type="text"
              name="role-name"
              placeholder="Enter Employee Position"
              required
              v-model="form.name"
            />

            <InputError :message="store.errors?.name" />
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
