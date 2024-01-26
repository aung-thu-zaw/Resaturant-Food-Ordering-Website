<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import { onMounted, reactive } from 'vue'
import { useCategoryStore } from '@/stores/dashboard/category'

useTitle('Edit Category - Restaurant Food Ordering')

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useCategoryStore()
const form = reactive({ name: '', status: '' })

onMounted(async () => {
  await store.getCategory(props.slug)

  form.name = store.category?.name
  form.status = store.category?.status
})

const handleUpdateCategory = async () => await store.updateCategory({ ...form }, props.slug)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.categories.index" icon="fa-list" label="Categories">
          <BreadcrumbItem :label="store.category ? store.category?.name : ''" />
          <BreadcrumbItem label="Edit" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleUpdateCategory" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Category Name" required />

            <InputField
              type="text"
              name="category-name"
              placeholder="Enter Category Name"
              required
              v-model="form.name"
            />

            <InputError :message="store.errors?.name" />
          </div>

          <div>
            <InputLabel label="Status" required />

            <SelectBox
              name="status"
              :options="[
                {
                  label: 'Show',
                  value: true
                },
                {
                  label: 'Hide',
                  value: false
                }
              ]"
              required
              v-model="form.status"
              :selected="form.status"
            />

            <InputError :message="store.errors?.status" />
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
