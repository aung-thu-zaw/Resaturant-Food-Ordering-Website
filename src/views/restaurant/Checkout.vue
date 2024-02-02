<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
// import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { useTitle } from '@vueuse/core'
import { onMounted } from 'vue'

useTitle('Checkout - Restaurant Food Ordering')

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <AppLayout>
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <h1 class="font-bold text-4xl text-purpleDark">Checkout</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div data-aos="fade-right" data-aos-duration="1000" class="col-span-2">
            <div class="border p-10 bg-white rounded-md">
              <form @submit.prevent="" class="space-y-4 md:space-y-6">
                <div>
                  <InputLabel label="Contact Person Name" required />

                  <InputField type="text" name="full-name" placeholder="Enter Full Name" required />

                  <!-- <InputError :message="store.errors?.name" /> -->
                </div>
                <div>
                  <InputLabel label="Contact Person Phone" required />

                  <InputField type="text" name="phone" placeholder="Enter Phone Number" required />

                  <!-- <InputError :message="store.errors?.name" /> -->
                </div>
                <div>
                  <InputLabel label="Address" required />

                  <InputField type="text" name="phone" placeholder="Enter Your Address" required />

                  <!-- <InputError :message="store.errors?.name" /> -->
                </div>

                <div>
                  <InputLabel label="Delivery Area" required />

                  <SelectBox
                    name="delivery-area"
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
                  />

                  <!-- <InputError :message="store.errors?.status" /> -->
                </div>

                <div>
                  <InputLabel label="Shipping Method" required />

                  <SelectBox
                    name="shipping-method"
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
                  />

                  <!-- <InputError :message="store.errors?.status" /> -->
                </div>

                <div>
                  <InputLabel label="Order Note" />

                  <TextAreaField placeholder="Note about your order" />

                  <!-- <InputError :message="store.errors?.name" /> -->
                </div>

                <FormButton>
                  <i class="fa-solid fa-credit-card"></i>
                  Proceed Payment
                </FormButton>
              </form>
            </div>
          </div>
          <div class="col-span-1" data-aos="fade-left" data-aos-duration="1000">
            <div class="border border-gray-200 bg-white shadow-sm rounded-md mb-5 p-5">
              <h2 class="text-center mb-5 font-bold text-xl text-gray-800">Order Summary</h2>
              <ul class="space-y-3 text-sm font-semibold mb-5">
                <li class="flex justify-between text-gray-700">
                  <span>Total Items:</span>
                  <span>5 Items</span>
                </li>

                <li class="flex justify-between text-gray-700">
                  <span>Total Items Price:</span>
                  <span>$ 100</span>
                </li>

                <li class="flex justify-between text-gray-700">
                  <span>Delivery:</span>
                  <span>$ 10</span>
                </li>

                <li class="flex justify-between text-gray-700">
                  <span>Coupon Code:</span>
                  <span class="text-yellow-600 text-sm font-bold">
                    Global Usage
                    <button class="text-gray-700 cursor-pointer hover:text-red-600">
                      <i class="fas fa-xmark"></i>
                    </button>
                  </span>
                </li>

                <!-- <li v-show="coupon" class="flex justify-between text-gray-700">
                    <span>Coupon Discount:</span>
                    <span v-if="coupon?.type === 'fixed'" class="text-gray-700 text-sm font-bold">
                      - $ {{ formatAmount(coupon.value) }}
                    </span>
                    <span
                      v-else-if="coupon?.type === 'percentage'"
                      class="text-gray-700 text-sm font-bold"
                    >
                      - % {{ coupon.value }}
                    </span>
                  </li> -->

                <li class="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                  <span>Total Price:</span>
                  <span> $ 150.45</span>
                </li>
              </ul>
            </div>

            <div class="border border-gray-200 bg-white shadow-sm rounded-md mb-5 p-5">
              <span class="font-bold text-orange-600 text-sm my-4"> Coupon code is applied </span>

              <form @submit.prevent="" class="space-y-3">
                <div>
                  <InputField type="text" name="coupon-code" placeholder="Enter Coupon Code" />
                </div>

                <button
                  type="submit"
                  class="px-4 py-3 inline-block text-sm w-full text-center font-semibold text-white bg-orange-600 shadow-sm border border-gray-200 rounded-md hover:bg-orange-700 duration-200"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('../../assets/images/chef-cover.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

.scrollbar::-webkit-scrollbar {
  height: 10px;
}
</style>