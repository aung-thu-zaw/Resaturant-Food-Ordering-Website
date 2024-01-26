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
import { useShippingMethodStore } from '@/stores/dashboard/shippingMethod'

useTitle('Edit Shipping Method - Restaurant Food Ordering')

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useShippingMethodStore()
const form = reactive({ name: '', cost: '' })

onMounted(async () => {
  await store.getShippingMethod(props.slug)

  form.name = store.shippingMethod?.name
  form.cost = store.shippingMethod?.cost
})

const handleUpdateShippingMethod = async () =>
  await store.updateShippingMethod({ ...form }, props.slug)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.shipping-methods.index" icon="fa-truck-fast" label="Shipping Methods">
          <BreadcrumbItem :label="store.shippingMethod ? store.shippingMethod?.name : ''" />
          <BreadcrumbItem label="Edit" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleUpdateShippingMethod" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Shipping Method Name" required />

            <InputField
              type="text"
              name="shipping-method-name"
              placeholder="Enter Shipping Method"
              required
              v-model="form.name"
            />

            <InputError :message="store.errors?.name" />
          </div>

          <div>
            <InputLabel label="Shipping Cost" required />

            <InputField
              type="text"
              name="shipping-cost"
              placeholder="Enter Shipping Cost"
              required
              v-model="form.cost"
            />

            <InputError :message="store.errors?.cost" />
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
