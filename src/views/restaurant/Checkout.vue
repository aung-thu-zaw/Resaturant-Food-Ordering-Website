<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { useTitle } from '@vueuse/core'
import OrderSummaryCard from '@/components/Cards/OrderSummaryCard.vue'
import CheckoutCouponForm from '@/components/Forms/CheckoutCouponForm.vue'
import { onMounted, reactive, watch } from 'vue'
import { useCheckoutStore } from '@/stores/restaurant/checkout'
import { storeToRefs } from 'pinia'

useTitle('Checkout - Restaurant Food Ordering')

const store = useCheckoutStore()

const { shippingMethods, deliveryAreas } = storeToRefs(store)

onMounted(async () => {
  await store.getResources()
  window.scrollTo(0, 0)
})

const form = reactive({
  contact_name: '',
  contact_phone: '',
  address: '',
  shipping_method: '',
  shipping_cost: 0,
  delivery_area: '',
  order_note: ''
})

watch(
  () => form.shipping_method,
  (newValue) => {
    const selectedShippingMethod = shippingMethods.value.find(
      (shippingMethod) => shippingMethod.name === newValue
    )

    form.shipping_cost = selectedShippingMethod ? selectedShippingMethod.cost : 0
  }
)

const handleStoreInformation = async () => await store.storeCheckoutInformation(form)
</script>

<template>
  <AppLayout>
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <h1 class="font-bold text-4xl text-purpleDark">Checkout</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div data-aos="fade-right" data-aos-duration="1000" class="col-span-2">
            <div class="border p-10 bg-white rounded-md">
              <form @submit.prevent="handleStoreInformation" class="space-y-4 md:space-y-6">
                <div>
                  <InputLabel label="Contact Person Name" required />

                  <InputField
                    type="text"
                    name="full-name"
                    placeholder="Enter Full Name"
                    v-model="form.contact_name"
                    required
                  />

                  <InputError :message="store.errors?.contact_name" />
                </div>

                <div>
                  <InputLabel label="Contact Person Phone" required />

                  <InputField
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    v-model="form.contact_phone"
                    required
                  />

                  <InputError :message="store.errors?.contact_phone" />
                </div>

                <div>
                  <InputLabel label="Address" required />

                  <InputField
                    type="text"
                    name="phone"
                    placeholder="Enter Your Address"
                    v-model="form.address"
                    required
                  />

                  <InputError :message="store.errors?.address" />
                </div>

                <div>
                  <InputLabel label="Shipping Method" required />

                  <select
                    name="shipping-method"
                    class="block w-full p-4 font-semibold text-sm text-gray-800 bg-gray-50 transition-all outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400 rounded-md"
                    v-model="form.shipping_method"
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    <option
                      v-for="shippingMethod in shippingMethods"
                      :key="shippingMethod?.id"
                      :value="shippingMethod?.name"
                    >
                      {{ shippingMethod?.name }}
                    </option>
                  </select>

                  <InputError :message="store.errors?.shipping_method" />
                </div>

                <div>
                  <InputLabel label="Delivery Area" required />

                  <SelectBox
                    name="delivery-area"
                    :options="deliveryAreas ?? {}"
                    :selected="''"
                    v-model="form.delivery_area"
                    required
                  />

                  <InputError :message="store.errors?.delivery_area" />
                </div>

                <div>
                  <InputLabel label="Order Note" />

                  <TextAreaField placeholder="Note about your order" v-model="form.order_note" />

                  <InputError :message="store.errors?.order_note" />
                </div>

                <FormButton>
                  <i class="fa-solid fa-credit-card"></i>
                  Proceed Payment
                </FormButton>
              </form>
            </div>
          </div>
          <div class="col-span-1" data-aos="fade-left" data-aos-duration="1000">
            <OrderSummaryCard :deliveryCost="form.shipping_cost" />

            <CheckoutCouponForm />
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