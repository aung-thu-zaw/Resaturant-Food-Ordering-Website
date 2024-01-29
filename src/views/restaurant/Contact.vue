<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import TextareaField from '@/components/Forms/Fields/TextareaField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { reactive } from 'vue'
import { useContactUsStore } from '@/stores/restaurant/contact'

const store = useContactUsStore()
const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleSendContactEmail = async () => {
  await store.sendContactEmail({ ...form })

  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}
</script>

<template>
  <AppLayout>
    <section class="background">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">Contact With Us</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">Contact</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-slate-50">
      <div class="container mx-auto space-y-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- Card -->
          <div class="flex flex-col border border-slate-300 rounded-xl p-4 sm:p-6 lg:p-8">
            <h2 class="mb-8 text-xl font-semibold text-slate-800">Fill in the form</h2>

            <form @submit.prevent="handleSendContactEmail" class="space-y-4 md:space-y-6">
              <div>
                <InputLabel label="Your Name" required />

                <InputField
                  type="text"
                  name="your-name"
                  placeholder="Enter Your Full Name"
                  required
                  v-model="form.name"
                />

                <InputError :message="store.errors?.name" />
              </div>

              <div class="grid grid-cols-2 gap-5">
                <div>
                  <InputLabel label="Your Email Address" required />

                  <InputField
                    type="text"
                    name="your-email"
                    placeholder="Enter Your Email Address"
                    required
                    v-model="form.email"
                  />

                  <InputError :message="store.errors?.email" />
                </div>
                <div>
                  <InputLabel label="Your Phone" required />

                  <InputField
                    type="text"
                    name="your-phone"
                    placeholder="Enter Your Phone Number"
                    required
                    v-model="form.phone"
                  />

                  <InputError :message="store.errors?.phone" />
                </div>
              </div>

              <div>
                <InputLabel label="Message" required />

                <TextareaField placeholder="Enter Your Message" required v-model="form.message" />

                <InputError :message="store.errors?.message" />
              </div>

              <div class="">
                <FormButton class="bg-purpleDark text-white w-full rounded-md">
                  <i class="fa-solid fa-paper-plane"></i>
                  Send Message
                </FormButton>
              </div>
            </form>
          </div>
          <!-- End Card -->

          <div class="divide-y divide-slate-200">
            <!-- Contact us by email -->
            <div class="flex gap-x-7 py-6">
              <svg
                class="w-6 h-6 text-slate-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m3.5 5.5 7.9 6c.4.3.8.3 1.2 0l7.9-6M4 19h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                />
              </svg>
              <div class="grow">
                <h3 class="font-semibold text-slate-800">Contact us by email</h3>
                <p class="mt-1 text-sm text-slate-500">
                  If you wish to write us an email instead, please use
                </p>
                <a
                  class="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-slate-800 hover:text-slate-900"
                  href="mailto:example@site.com"
                >
                  example@site.com
                </a>
              </div>
            </div>

            <!-- Contact us by phone -->
            <div class="flex gap-x-7 py-6">
              <svg
                class="w-6 h-6 text-slate-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m18.4 14.8-1.2-1.3a1.7 1.7 0 0 0-2.4 0l-.7.7a1.7 1.7 0 0 1-2.4 0l-1.9-1.9a1.7 1.7 0 0 1 0-2.4l.7-.6a1.7 1.7 0 0 0 0-2.5L9.2 5.6a1.6 1.6 0 0 0-2.4 0c-3.2 3.2-1.7 6.9 1.5 10 3.2 3.3 7 4.8 10.1 1.6a1.6 1.6 0 0 0 0-2.4Z"
                />
              </svg>
              <div class="grow">
                <h3 class="font-semibold text-slate-800">Contact us by phone</h3>
                <p class="mt-1 text-sm text-slate-500">
                  If you prefer to contact us by phone, please call
                </p>
                <a
                  class="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-slate-800 hover:text-slate-900"
                  href="tel:+1234567890"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <!-- Restaurant Location -->
            <div class="flex gap-x-7 py-6">
              <svg
                class="w-6 h-6 text-slate-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"
                />
              </svg>
              <div class="grow">
                <h3 class="font-semibold text-slate-800">Restaurant Location</h3>
                <p class="mt-1 text-sm text-slate-500">
                  Visit our restaurant at the following location
                </p>
                <span class="mt-2 text-sm font-medium text-slate-800">
                  123 Main Street, Cityville, Country
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full border rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15583.888439078957!2d98.59742055367593!3d12.45157830817382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srestaurants!5e0!3m2!1sen!2smm!4v1706376242270!5m2!1sen!2smm"
            width="100%"
            height="500"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('https://www.naturemade.com/cdn/shop/articles/healthy-foods-to-eat.jpg?v=1611988563');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
