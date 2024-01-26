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
import { onMounted, reactive, ref, watch } from 'vue'
import { useEmployeeStore } from '@/stores/dashboard/employee'
import { useImagePreview } from '@/Composables/useImagePreview'
import { storeToRefs } from 'pinia'
import image from '@/assets/images/no-image.jpeg'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

useTitle('Create Employee - Restaurant Food Ordering')

const store = useEmployeeStore()
const isCreateAnother = ref(false)
const createForm = ref(false)
const { employeePositions } = storeToRefs(store)
const form = reactive({
  employee_position_id: '',
  image: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  experience: '',
  salary: '',
  vacation: '',
  status: '',
  date_of_birth: '',
  joining_date: '',
  termination_date: ''
})

onMounted(async () => await store.getResources())

const { previewImage, setImagePreview } = useImagePreview()
const { formatDate } = useFormatFunctions()

const handleCreateEmployee = async () => {
  await store.createEmployee({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    createForm.value.reset()
    form.employee_position_id = ''
    form.image = ''
    form.name = ''
    form.email = ''
    form.phone = ''
    form.address = ''
    form.experience = ''
    form.salary = ''
    form.vacation = ''
    form.status = ''
    form.date_of_birth = ''
    form.joining_date = ''
    form.termination_date = ''

    previewImage.value = image
    await store.getResources()
  }
}

watch(
  () => form.date_of_birth,
  (newDate) => (form.date_of_birth = formatDate(newDate))
)

watch(
  () => form.joining_date,
  (newDate) => (form.joining_date = formatDate(newDate))
)

watch(
  () => form.termination_date,
  (newDate) => (form.termination_date = formatDate(newDate))
)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.employees.index" icon="fa-user-tie" label="Employees">
          <BreadcrumbItem label="Create" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form
          ref="createForm"
          @submit.prevent="handleCreateEmployee"
          class="space-y-4 md:space-y-6"
        >
          <PreviewImage :src="previewImage" />

          <div>
            <InputLabel label="Name" required />

            <InputField
              type="text"
              name="employee-name"
              v-model="form.name"
              placeholder="Enter Name"
              required
            />

            <InputError :message="store.errors?.name" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <InputLabel label="Email Address" required />

              <InputField
                type="email"
                name="employee-email"
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
                name="employee-phone"
                v-model="form.phone"
                placeholder="Enter Phone Number"
                required
              />

              <InputError :message="store.errors?.phone" />
            </div>
          </div>

          <div>
            <InputLabel label="Address" required />

            <InputField
              type="text"
              name="employee-address"
              v-model="form.address"
              placeholder="Enter Address"
              required
            />

            <InputError :message="store.errors?.address" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <InputLabel label="Experience" />

              <InputField
                type="text"
                name="employee-experience"
                v-model="form.experience"
                placeholder="Enter Employee Experience ( Eg. 1 Year )"
              />

              <InputError :message="store.errors?.experience" />
            </div>

            <div>
              <InputLabel label="Position" required />

              <SelectBox
                name="role"
                :options="employeePositions ?? {}"
                v-model="form.employee_position_id"
                placeholder="Select an option"
                required
              />

              <InputError :message="store.errors?.employee_position_id" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <InputLabel label="Date of birth" required />

              <VueDatePicker
                v-model="form.date_of_birth"
                text-input
                required
                :enable-time-picker="false"
                placeholder="Select Employee Birth Date"
              />

              <InputError :message="store.errors?.date_of_birth" />
            </div>

            <div>
              <InputLabel label="Joining Date" required />

              <VueDatePicker
                v-model="form.joining_date"
                text-input
                required
                :enable-time-picker="false"
                placeholder="Select Employee Joining Date"
              />

              <InputError :message="store.errors?.joining_date" />
            </div>

            <div>
              <InputLabel label="Termination Date" />

              <VueDatePicker
                v-model="form.termination_date"
                text-input
                :enable-time-picker="false"
                placeholder="Select Employee Termination Date"
              />

              <InputError :message="store.errors?.termination_date" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <InputLabel label="Salary" required />

              <InputField
                type="text"
                name="employee-salary"
                v-model="form.salary"
                placeholder="Enter Employee Salary"
                required
              />

              <InputError :message="store.errors?.salary" />
            </div>

            <div>
              <InputLabel label="Vacation" required />

              <SelectBox
                name="vacation"
                :options="[
                  {
                    label: 'Sunday',
                    value: 'sunday'
                  },
                  {
                    label: 'Monday',
                    value: 'monday'
                  },
                  {
                    label: 'Tuesday',
                    value: 'tuesday'
                  },
                  {
                    label: 'Wednesday',
                    value: 'wednesday'
                  },
                  {
                    label: 'Thursday',
                    value: 'thursday'
                  },
                  {
                    label: 'Friday',
                    value: 'friday'
                  },
                  {
                    label: 'Saturday',
                    value: 'saturday'
                  }
                ]"
                v-model="form.vacation"
                placeholder="Select an option"
                required
              />

              <InputError :message="store.errors?.vacation" />
            </div>
          </div>

          <div>
            <InputLabel label="Status" required />

            <SelectBox
              name="status"
              :options="[
                {
                  label: 'Active',
                  value: 'active'
                },
                {
                  label: 'Inactive',
                  value: 'inactive'
                }
              ]"
              v-model="form.status"
              placeholder="Select an option"
              required
            />

            <InputError :message="store.errors?.status" />
          </div>

          <div>
            <InputLabel label="Image" required />

            <FileInput
              name="employee-image"
              text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
              v-model="form.image"
              @update:modelValue="setImagePreview"
              required
            />

            <InputError :message="store.errors?.image" />
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
