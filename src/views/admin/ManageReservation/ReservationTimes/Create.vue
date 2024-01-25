<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { useReservationTimeStore } from '@/stores/dashboard/reservationTime'

useTitle('Create Reservation Time - Restaurant Food Ordering')

const store = useReservationTimeStore()
const isCreateAnother = ref(false)
const form = reactive({ start_time: '', end_time: '' })

const handleCreateReservationTime = async () => {
  await store.createReservationTime({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    form.start_time = ''
    form.end_time = ''
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb
          to="admin.reservation-times.index"
          icon="fa-calendar-week"
          label="Reservation Times"
        >
          <BreadcrumbItem label="Create" />
        </Breadcrumb>

        <div class="w-auto flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>
      {{ form }}
      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleCreateReservationTime" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Start Time" required />

            <VueDatePicker
              v-model="form.start_time"
              required
              time-picker
              placeholder="Select Start Time"
            />

            <InputError :message="store.errors?.start_time" />
          </div>

          <div>
            <InputLabel label="End Time" required />

            <VueDatePicker
              v-model="form.end_time"
              required
              time-picker
              placeholder="Select End Time"
            />

            <InputError :message="store.errors?.end_time" />
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
