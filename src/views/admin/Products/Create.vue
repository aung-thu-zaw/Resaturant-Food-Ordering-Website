<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import FileInput from '@/components/Forms/Fields/FileInput.vue'
import SwitchCheckbox from '@/components/Forms/Fields/SwitchCheckbox.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import ProductMultipleFileInput from '@/components/Forms/ProductMultipleFileInput.vue'
import ProductImagePreview from '@/components/Galleries/ProductImagePreview.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import { onMounted, reactive, ref, watch } from 'vue'
import { useProductStore } from '@/stores/dashboard/product'
import { useImagePreview } from '@/composables/useImagePreview'
import { useFormatFunctions } from '@/composables/useFormatFunctions'
import { storeToRefs } from 'pinia'
import image from '@/assets/images/no-image.jpeg'

useTitle('Create Product - Restaurant Food Ordering')

const isCreateAnother = ref(false)
const isDiscount = ref(false)
const createForm = ref(null)
const productAddons = ref([])
const store = useProductStore()

const { categories } = storeToRefs(store)
const { formatDateTime } = useFormatFunctions()
const {
  previewImage,
  setImagePreview,
  previewImages,
  setMultipleImagePreviews,
  removeMultiplePreviewImage
} = useImagePreview(image)

const form = reactive({
  category_id: '',
  image: '',
  additional_images: [],
  name: '',
  ingredients: '',
  description: '',
  qty: '',
  is_available: '',
  base_price: '',
  discount_price: '',
  discount_end_time: '',
  status: 'draft',
  addons: []
})

onMounted(async () => await store.getResources())

const addNewProductAddon = () => {
  productAddons.value.push({ name: '', additional_price: '' })

  form.addons = productAddons.value
}

const deleteAddon = (index) => productAddons.value.splice(index, 1)

const handleRemovePreviewImage = (index) => {
  removeMultiplePreviewImage(index)

  const additionalImages = Array.from(form.additional_images)

  additionalImages.splice(index, 1)
  form.additional_images = additionalImages
}

const handleCreateProduct = async () => {
  await store.createProduct({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    createForm.value.reset()

    form.category_id = ''
    form.image = ''
    form.additional_images = []
    form.name = ''
    form.ingredients = ''
    form.description = ''
    form.qty = ''
    form.is_available = ''
    form.base_price = ''
    form.discount_price = ''
    form.discount_end_time = ''
    form.status = ''
    form.addons = []

    isDiscount.value = false
    previewImage.value = image
    previewImages.value = []
    productAddons.value = []

    await store.getResources()
  }
}

watch(
  () => form.discount_end_time,
  (newDateTime) => (form.discount_end_time = formatDateTime(newDateTime))
)

watch(
  () => isDiscount.value,
  () => {
    if (!isDiscount.value) {
      form.discount_price = ''
      form.discount_end_time = ''
    }
  }
)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.products.index" icon="fa-utensils" label="Products">
          <BreadcrumbItem label="Create" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="w-full">
        <form
          ref="createForm"
          @submit.prevent="handleCreateProduct"
          class="w-full flex flex-col md:flex-row items-start justify-between space-y-3 md:space-y-0 md:space-x-3"
        >
          <div class="flex flex-col items-center justify-center space-y-3 w-full md:w-5/12">
            <div class="border p-5 bg-white rounded-md space-y-4 md:space-y-6 w-full">
              <ProductImagePreview
                :previewImage="previewImage"
                :previewImages="previewImages"
                @removeImage="handleRemovePreviewImage(index)"
              />

              <div>
                <ProductMultipleFileInput
                  name="additional-images"
                  v-model="form.additional_images"
                  @update:modelValue="setMultipleImagePreviews"
                  required
                />

                <div v-for="(error, index) in store.errors" :key="index">
                  <InputError v-show="error.startsWith('additional_images')" :message="error" />
                </div>
              </div>
            </div>

            <div class="border p-5 bg-white rounded-md space-y-4 md:space-y-6 w-full">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-md text-slate-700">
                  <i class="fa-solid fa-jar mr-2"></i>Product Addons
                </h3>

                <button
                  type="button"
                  @click="addNewProductAddon"
                  class="font-semibold text-[13px] text-primary hover:text-orange-600 duration-150"
                >
                  <i class="fa-solid fa-plus"></i> Add Addon
                </button>
              </div>

              <div
                v-for="(productAddon, index) in productAddons"
                :key="index"
                class="flex items-center justify-between w-full"
              >
                <div class="flex items-center space-x-3 w-full">
                  <div class="w-full">
                    <InputLabel label="Addon Name" required />

                    <InputField
                      type="text"
                      :id="'addon-name-' + index"
                      :name="'addon-name-' + index"
                      placeholder="Eg. Extra Sauce"
                      required
                      v-model="productAddon.name"
                    />
                  </div>

                  <div class="w-full">
                    <InputLabel label="Additional Price" required />

                    <InputField
                      type="text"
                      :id="'addon-price-' + index"
                      :name="'addon-price-' + index"
                      placeholder="Enter Additional Price"
                      required
                      v-model="productAddon.additional_price"
                    />
                  </div>
                </div>
                <button
                  @click="deleteAddon(index)"
                  type="button"
                  class="text-slate-600 text-sm hover:text-red-700 mt-8 ml-4"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="border p-10 bg-white rounded-md space-y-4 md:space-y-6 w-full md:w-7/12">
            <div>
              <InputLabel label="Product Name" required />

              <InputField
                type="text"
                name="product-name"
                placeholder="Enter Product Name"
                required
                v-model="form.name"
              />

              <InputError :message="store.errors?.name" />
            </div>

            <div>
              <InputLabel label="Category" required />

              <SelectBox
                name="category"
                :options="categories ?? {}"
                required
                v-model="form.category_id"
              />

              <InputError :message="store.errors?.category_id" />
            </div>

            <div class="grid grid-cols-2 gap-5">
              <div>
                <InputLabel label="Product Stock" required />

                <InputField
                  type="number"
                  name="product-qty"
                  placeholder="Enter Product Quantity"
                  required
                  v-model="form.qty"
                />

                <InputError :message="store.errors?.qty" />
              </div>

              <div>
                <InputLabel label="Price" required />

                <InputField
                  type="text"
                  name="product-price"
                  placeholder="Enter Product Base Price"
                  required
                  v-model="form.base_price"
                />

                <InputError :message="store.errors?.base_price" />
              </div>
            </div>

            <div class="space-x-3 mr-auto w-full flex items-center justify-end">
              <label for="Discount" class="text-sm font-bold text-slate-800">Add Discount</label>
              <SwitchCheckbox v-model:checked="isDiscount" />
            </div>

            <div v-show="isDiscount" class="grid grid-cols-2 gap-5">
              <div>
                <InputLabel label="Discount Price" :required="isDiscount" />

                <InputField
                  type="text"
                  name="discount-price"
                  placeholder="Enter Product Discount"
                  :required="isDiscount"
                  v-model="form.discount_price"
                />

                <InputError :message="store.errors?.discount_price" />
              </div>

              <div>
                <InputLabel label="Discount End Date" :required="isDiscount" />

                <VueDatePicker
                  v-model="form.discount_end_time"
                  text-input
                  :required="isDiscount"
                  :enable-time-picker="false"
                  placeholder="Select End Date"
                />

                <InputError :message="store.errors?.discount_end_time" />
              </div>
            </div>

            <div>
              <InputLabel label="ingredients" />

              <InputField
                type="text"
                name="product-ingredients"
                placeholder="Enter ingredients"
                required
                v-model="form.ingredients"
              />

              <InputError :message="store.errors?.ingredients" />
            </div>

            <div>
              <InputLabel label="Description" />

              <TextAreaField
                name="product-description"
                placeholder="Enter Product Description"
                v-model="form.description"
              />

              <InputError :message="store.errors?.description" />
            </div>

            <div class="grid grid-cols-2 gap-5">
              <div>
                <InputLabel label="Status" required />

                <SelectBox
                  name="status"
                  :options="[
                    {
                      label: 'Save as Draft',
                      value: 'draft'
                    },
                    {
                      label: 'Publish',
                      value: 'published'
                    }
                  ]"
                  required
                  v-model="form.status"
                />

                <InputError :message="store.errors?.status" />
              </div>

              <div>
                <InputLabel label="Is Available Now" required />

                <SelectBox
                  name="is-available"
                  :options="[
                    {
                      label: 'Yes',
                      value: true
                    },
                    {
                      label: 'No',
                      value: false
                    }
                  ]"
                  required
                  v-model="form.is_available"
                />

                <InputError :message="store.errors?.is_available" />
              </div>
            </div>

            <div>
              <InputLabel label="Cover Image" required />

              <FileInput
                name="product-image"
                v-model="form.image"
                text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
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
          </div>
        </form>
      </div>
      <!-- Form End -->
    </div>
  </DashboardLayout>
</template>
