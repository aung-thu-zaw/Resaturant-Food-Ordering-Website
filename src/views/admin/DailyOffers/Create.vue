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
import { onMounted, reactive, ref, watch } from 'vue'
import { useDailyOfferStore } from '@/stores/dashboard/dailyOffer'
import { storeToRefs } from 'pinia'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

useTitle('Create Daily Offer - Restaurant Food Ordering')

const store = useDailyOfferStore()
const isCreateAnother = ref(false)
const form = reactive({ product_id: '', start_date: '', end_date: '', discount_percentage: '' })
const { products } = storeToRefs(store)
const { formatDate } = useFormatFunctions()

onMounted(async () => await store.getResources())

watch(
  () => form.start_date,
  (newStartDate) => (form.start_date = formatDate(newStartDate))
)

watch(
  () => form.end_date,
  (newEndDate) => (form.end_date = formatDate(newEndDate))
)

const handleCreateDailyOffer = async () => {
  await store.createDailyOffer({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    form.product_id = ''
    form.start_date = ''
    form.end_date = ''
    form.discount_percentage = ''

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
        <Breadcrumb to="admin.daily-offers.index" icon="fa-clock" label="Daily Offers">
          <BreadcrumbItem label="Create" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleCreateDailyOffer" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Products" required />

            <SelectBox
              name="product_id"
              :options="products ?? {}"
              required
              v-model="form.product_id"
            />

            <InputError :message="store.errors?.product_id" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <InputLabel label="Discount Start Date" required />

              <VueDatePicker
                v-model="form.start_date"
                text-input
                required
                :enable-time-picker="false"
                placeholder="Select Discount Start Date"
              />

              <InputError :message="store.errors?.start_date" />
            </div>

            <div>
              <InputLabel label="Discount End Date" required />

              <VueDatePicker
                v-model="form.end_date"
                text-input
                required
                :enable-time-picker="false"
                placeholder="Select Discount Start Date"
              />

              <InputError :message="store.errors?.end_date" />
            </div>
          </div>

          <div>
            <InputLabel label="Discount Percentage" required />

            <InputField
              type="text"
              name="product-price"
              placeholder="Enter Product Discount Percentage"
              required
              v-model="form.discount_percentage"
            />

            <InputError :message="store.errors?.discount_percentage" />
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
