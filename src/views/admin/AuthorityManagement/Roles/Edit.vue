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
import { useRoleStore } from '@/stores/dashboard/role'

useTitle('Edit Role - Restaurant Food Ordering')

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const store = useRoleStore()
const form = reactive({ name: '' })

onMounted(async () => {
  await store.getRole(props.id)

  form.name = store.role?.name
})

const handleUpdateRole = async () => await store.updateRole({ ...form }, props.id)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.categories.index" icon="fa-list" label="Categories">
          <BreadcrumbItem :label="store.role ? store.role?.name : ''" />
          <BreadcrumbItem label="Edit" />
        </Breadcrumb>

        <div class="w-auto flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleUpdateRole" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Role Name" required />

            <InputField
              type="text"
              name="role-name"
              placeholder="Enter Role Name"
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
