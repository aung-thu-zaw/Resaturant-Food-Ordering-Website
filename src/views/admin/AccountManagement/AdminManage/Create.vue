<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import PreviewImage from '@/Components/Forms/PreviewImage.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import FileInput from '@/components/Forms/Fields/FileInput.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import { onMounted, reactive, ref } from 'vue'
import { useAdminManageStore } from '@/stores/dashboard/adminManage'
import { useImagePreview } from '@/Composables/useImagePreview'
import { storeToRefs } from 'pinia'
import image from '@/assets/images/no-image.jpeg'

useTitle('Create Admin - Restaurant Food Ordering')

const store = useAdminManageStore()
const isCreateAnother = ref(false)
const createForm = ref(false)
const { roles } = storeToRefs(store)
const form = reactive({
  role_id: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  avatar: ''
})

onMounted(async () => await store.getResources())

const { previewImage, setImagePreview } = useImagePreview()

const handleCreateAdmin = async () => {
  await store.createAdmin({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    createForm.value.reset()
    form.role_id = ''
    form.name = ''
    form.email = ''
    form.phone = ''
    form.password = ''
    form.password_confirmation = ''
    form.avatar = ''

    previewImage.value = image
    await store.getResources()
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.admin-manage.index" icon="fa-user-gear" label="Admin Manage">
          <BreadcrumbItem label="Create" />
        </Breadcrumb>

        <div class="w-auto flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form ref="createForm" @submit.prevent="handleCreateAdmin" class="space-y-4 md:space-y-6">
          <PreviewImage :src="previewImage" />

          <div>
            <InputLabel label="Name" required />

            <InputField
              type="text"
              name="admin-name"
              v-model="form.name"
              placeholder="Enter Name"
              required
            />

            <InputError :message="store.errors?.name" />
          </div>

          <div>
            <InputLabel label="Email Address" required />

            <InputField
              type="email"
              name="admin-email"
              v-model="form.email"
              placeholder="Enter Email Address"
              required
            />

            <InputError :message="store.errors?.email" />
          </div>

          <div>
            <InputLabel label="Phone Number" required />

            <InputField
              type="text"
              name="admin-phone"
              v-model="form.phone"
              placeholder="Enter Phone Number"
              required
            />

            <InputError :message="store.errors?.phone" />
          </div>

          <div class="grid grid-cols-2 gap-5">
            <div>
              <InputLabel label="Password" required />

              <InputField
                type="password"
                name="admin-password"
                v-model="form.password"
                placeholder="Enter Password"
                required
              />

              <InputError :message="store.errors?.password" />
            </div>

            <div>
              <InputLabel label="Confirm Password" required />

              <InputField
                type="password"
                name="admin-confirm-password"
                v-model="form.password_confirmation"
                placeholder="Retype Password"
                required
              />

              <InputError :message="store.errors?.password_confirmation" />
            </div>
          </div>

          <div>
            <InputLabel label="Role" required />

            <SelectBox
              name="role"
              :options="roles ?? {}"
              v-model="form.role_id"
              placeholder="Select an option"
              required
            />

            <InputError :message="store.errors?.role_id" />
          </div>

          <div>
            <InputLabel label="Avatar" required />

            <FileInput
              name="admin-avatar"
              text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
              v-model="form.avatar"
              @update:modelValue="setImagePreview"
              required
            />

            <InputError :message="store.errors?.avatar" />
          </div>

          <div class="flex items-center justify-end w-full space-x-5">
            <FormButton
              @click="isCreateAnother = true"
              class="w-[200px] text-white bg-slate-600 hover:bg-slate-700 rounded-md"
            >
              Save And Create Another
            </FormButton>

            <FormButton
              @click="isCreateAnother = false"
              class="w-[100px] text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              <i class="fa-solid fa-save"></i>
              Save
            </FormButton>
          </div>
        </form>
      </div>
      <!-- Form End -->
    </div>
  </DashboardLayout>
</template>
