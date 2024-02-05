<script setup>
import InputError from '@/components/Forms/Fields/InputError.vue'
import TextAreaField from '@/Components/Forms/Fields/TextAreaField.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import Modal from '@/Components/Modals/ModalContainer.vue'
import { useProductReviewStore } from '@/stores/restaurant/productReview'
import { useAuthStore } from '@/stores/auth'
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

const props = defineProps({ orderItem: Object })

const authStore = useAuthStore()
const store = useProductReviewStore()
const addReview = ref(false)

const form = reactive({
  comment: '',
  rating: ''
})

const { currentUser } = storeToRefs(authStore)

const confirmAddReview = () => (addReview.value = true)

const closeModal = () => (addReview.value = false)

const addons = computed(() => {
  return JSON.parse(props.orderItem?.addons)
})
const formattedAddons = computed(() => {
  if (!addons.value || addons.value.length === 0) return ''

  return addons.value.map((addon) => `${addon.name}`).join(' | ')
})

const isReviewed = ref(
  props?.orderItem?.product?.product_reviews?.some(
    (review) => review?.user_id === currentUser.value?.id
  )
)

const handleProductReview = async () => {
  const response = await store.createProductReview(props?.orderItem?.product?.slug, form)

  isReviewed.value = true

  if (response.status === 200) closeModal()
}
</script>

<template>
  <div
    class="border border-slate-200 rounded-md flex items-start justify-between space-x-5 p-5 w-full"
  >
    <div class="w-full flex items-start justify-between">
      <div class="flex items-start justify-center w-full">
        <div class="min-w-[100px] overflow-hidden">
          <img
            :src="orderItem?.product?.image"
            :alt="orderItem?.product?.name"
            class="w-20 h-20 object-cover rounded-md"
          />
        </div>
        <div class="space-y-3 max-w-[400px] w-full">
          <div class="flex items-start justify-between w-full">
            <router-link
              :to="{
                name: 'menus.show',
                params: { slug: orderItem?.product?.slug },
                query: { tab: 'description' }
              }"
              class="font-semibold text-md text-slate-700 line-clamp-2 w-full"
            >
              {{ orderItem?.product?.name }}
            </router-link>
            <p class="text-sm font-bold text-slate-700 min-w-[50px] text-left">
              Qty : {{ orderItem?.qty }}
            </p>
          </div>

          <div
            v-show="orderItem?.addons?.length"
            class="flex space-x-1 items-center flex-wrap text-xs font-medium mb-5"
          >
            <span class="text-[.7rem] rounded-md font-semibold text-orange-500">
              {{ formattedAddons }}
            </span>
          </div>

          <div class="text-xs font-bold text-orange-500 hover:underline">
            <button v-if="!isReviewed" @click="confirmAddReview">
              <i class="fa-solid fa-star"></i>
              Add Review
            </button>

            <router-link
              v-else
              :to="{
                name: 'menus.show',
                params: { slug: orderItem?.product?.slug },
                query: { tab: 'reviews' }
              }"
            >
              See Review
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Modal :show="addReview" @close="closeModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-10">Add Review</h2>

        <form @submit.prevent="handleProductReview" class="space-y-5">
          <div
            class="flex flex-col items-center space-y-3 border px-10 py-3 rounded-md bg-gray-100"
          >
            <h3 class="font-bold text-md text-slate-600">Select Ratings</h3>

            <div>
              <div class="flex flex-row-reverse justify-end items-center">
                <input
                  id="hs-ratings-readonly-1"
                  type="radio"
                  class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                  name="hs-ratings-readonly"
                  value="5"
                  v-model="form.rating"
                />
                <label
                  for="hs-ratings-readonly-1"
                  class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none"
                >
                  <svg
                    class="flex-shrink-0 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    />
                  </svg>
                </label>
                <input
                  id="hs-ratings-readonly-2"
                  type="radio"
                  class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                  name="hs-ratings-readonly"
                  value="4"
                  v-model="form.rating"
                />
                <label
                  for="hs-ratings-readonly-2"
                  class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none"
                >
                  <svg
                    class="flex-shrink-0 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    />
                  </svg>
                </label>
                <input
                  id="hs-ratings-readonly-3"
                  type="radio"
                  class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                  name="hs-ratings-readonly"
                  value="3"
                  v-model="form.rating"
                />
                <label
                  for="hs-ratings-readonly-3"
                  class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none"
                >
                  <svg
                    class="flex-shrink-0 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    />
                  </svg>
                </label>
                <input
                  id="hs-ratings-readonly-4"
                  type="radio"
                  class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                  name="hs-ratings-readonly"
                  value="2"
                  v-model="form.rating"
                />
                <label
                  for="hs-ratings-readonly-4"
                  class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none"
                >
                  <svg
                    class="flex-shrink-0 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    />
                  </svg>
                </label>
                <input
                  id="hs-ratings-readonly-5"
                  type="radio"
                  class="peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                  name="hs-ratings-readonly"
                  value="1"
                  v-model="form.rating"
                />
                <label
                  for="hs-ratings-readonly-5"
                  class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none"
                >
                  <svg
                    class="flex-shrink-0 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <InputError :message="store.errors?.rating" />
          </div>

          <div>
            <TextAreaField v-model="form.comment" placeholder="Write review for product" required />

            <InputError :message="store.errors?.comment" />
          </div>
          <div class="mt-6 flex justify-end space-x-5">
            <NormalButton @click="closeModal" class="bg-gray-500 text-white"> Cancel </NormalButton>
            <NormalButton type="submit" class="bg-blue-600 text-white">
              <i class="fa-solid fa-paper-plane"></i> Submit
            </NormalButton>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>