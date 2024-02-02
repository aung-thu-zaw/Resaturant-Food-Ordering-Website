<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
// import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import CheckoutCouponForm from '@/components/Forms/CheckoutCouponForm.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { useTitle } from '@vueuse/core'
import OrderSummaryCard from '@/components/Cards/OrderSummaryCard.vue'
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
            <OrderSummaryCard />

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