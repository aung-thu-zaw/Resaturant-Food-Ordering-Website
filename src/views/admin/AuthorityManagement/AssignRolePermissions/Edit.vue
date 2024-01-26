<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import Checkbox from '@/components/Forms/Fields/Checkbox.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import { computed, onMounted, reactive, ref } from 'vue'
import { useAssignRolePermissionStore } from '@/stores/dashboard/assignRolePermissions'

useTitle('Add Permissions - Restaurant Food Ordering')

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const roleName = ref(null)
const permissions = ref(null)
const permissionGroups = ref(null)
const store = useAssignRolePermissionStore()
const form = reactive({ role_id: '', permission_id: '' })

onMounted(async () => {
  await store.getResources()
  await store.getRole(props.id)

  roleName.value = store.role?.name
  permissions.value = store.permissions
  permissionGroups.value = store.permissionGroups
  form.role_id = store.role?.id
  form.permission_id = store.role.permissions.map((permission) => permission.id)
})

const allPermissionsSelected = computed(
  () => form.permission_id?.length === permissions.value?.length
)

// Handle Select All Button
const selectAllPermissions = () => {
  if (allPermissionsSelected.value) {
    form.permission_id = []
  } else {
    form.permission_id = permissions.value.map((permission) => permission.id)
  }
}

const handleUpdateAssignRolePermissions = async () =>
  await store.updateAssignRolePermission({ ...form }, props.id)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.assign-role-permissions.index" icon="fa-list" label="Add Permissions">
          <BreadcrumbItem :label="roleName ?? ''" />
          <BreadcrumbItem label="Edit" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleUpdateAssignRolePermissions" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Role" required />

            <InputField type="text" name="role-name" v-model="roleName" disabled />
          </div>

          <!-- Permissions Checkbox -->
          <div class="mb-6">
            <div class="flex items-start w-full space-x-5 my-5 text-md">
              <div class="w-1/3">
                <h3 class="font-bold text-md text-primary">Groups</h3>
              </div>
              <div class="w-full flex items-center justify-between">
                <h3 class="font-bold text-md text-primary">
                  <i class="fa-solid fa-key"></i>
                  Permissions
                </h3>

                <button
                  type="button"
                  @click="selectAllPermissions"
                  class="px-3 py-2 text-xs font-semibold rounded-full text-white transition-all"
                  :class="{
                    'bg-red-600 hover:bg-red-500': allPermissionsSelected,
                    'bg-primary hover:bg-primary': !allPermissionsSelected
                  }"
                >
                  <span v-if="!allPermissionsSelected"> Select All </span>
                  <span v-else>Deselect All</span>
                </button>
              </div>
            </div>

            <hr class="my-5" />

            <div
              v-for="permissionGroup in permissionGroups"
              :key="permissionGroup.id"
              class="flex items-start space-x-5 mb-10"
            >
              <div class="w-1/3">
                <div class="flex items-center">
                  <h3 class="ml-2 text-md font-bold text-slate-600 capitalize">
                    {{ permissionGroup.group }}
                  </h3>
                </div>
              </div>

              <div class="w-full space-y-1">
                <div
                  v-for="permission in permissions"
                  :key="permission.id"
                  v-show="permission.group === permissionGroup.group"
                  class="flex items-center"
                >
                  <Checkbox :value="permission.id" v-model:checked="form.permission_id" />

                  <span class="ml-2 text-sm font-bold text-slate-700">
                    {{ permission?.name }}
                  </span>
                </div>
              </div>
            </div>

            <InputError class="mt-2" :message="store.errors?.permission_id" />
          </div>

          <FormButton class="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Save Changes
          </FormButton>
        </form>
      </div>
      <!-- Form End -->
    </div>
  </DashboardLayout>
</template>
