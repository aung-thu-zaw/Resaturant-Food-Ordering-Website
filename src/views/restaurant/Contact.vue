<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
// import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import TextareaField from '@/components/Forms/Fields/TextareaField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
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

            <form @submit.prevent="" class="space-y-4 md:space-y-6">
              <div>
                <InputLabel label="Your Name" required />

                <InputField
                  type="text"
                  name="your-name"
                  placeholder="Enter Your Full Name"
                  required
                />

                <!-- <InputError message="" /> -->
              </div>

              <div class="grid grid-cols-2 gap-5">
                <div>
                  <InputLabel label="Your Email Address" required />

                  <InputField
                    type="text"
                    name="your-email"
                    placeholder="Enter Your Email Address"
                    required
                  />

                  <!-- <InputError message="" /> -->
                </div>
                <div>
                  <InputLabel label="Your Phone" required />

                  <InputField
                    type="text"
                    name="your-phone"
                    placeholder="Enter Your Phone Number"
                    required
                  />

                  <!-- <InputError message="" /> -->
                </div>
              </div>

              <div>
                <InputLabel label="Message" required />

                <TextareaField placeholder="Enter Your Message" required />

                <!-- <InputError message="" /> -->
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
            <!-- Icon Block -->
            <div class="flex gap-x-7 py-6">
              <svg
                class="flex-shrink-0 w-6 h-6 mt-1.5 text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <div class="grow">
                <h3 class="font-semibold text-slate-800">Knowledgebase</h3>
                <p class="mt-1 text-sm text-slate-500">
                  We're here to help with any questions or code.
                </p>
                <a
                  class="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-slate-800 hover:text-slate-900"
                  href="#"
                >
                  Contact support
                  <svg
                    class="flex-shrink-0 w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <!-- End Icon Block -->

            <!-- Icon Block -->
            <div class="flex gap-x-7 py-6">
              <svg
                class="flex-shrink-0 w-6 h-6 mt-1.5 text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
              <div class="grow">
                <h3 class="font-semibold text-slate-800">FAQ</h3>
                <p class="mt-1 text-sm text-slate-500">
                  Search our FAQ for answers to anything you might ask.
                </p>
                <a
                  class="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-slate-800 hover:text-slate-900"
                  href="#"
                >
                  Visit FAQ
                  <svg
                    class="flex-shrink-0 w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <!-- End Icon Block -->

            <!-- Icon Block -->
            <div class="flex gap-x-7 py-6">
              <svg
                class="flex-shrink-0 w-6 h-6 mt-1.5 text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m7 11 2-2-2-2" />
                <path d="M11 13h4" />
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              </svg>
              <div class="grow">
                <h3 class="font-semibold text-slate-800">Developer APIs</h3>
                <p class="mt-1 text-sm text-slate-500">
                  Check out our development quickstart guide.
                </p>
                <a
                  class="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-slate-800 hover:text-slate-900"
                  href="#"
                >
                  Contact sales
                  <svg
                    class="flex-shrink-0 w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <!-- End Icon Block -->

            <!-- Icon Block -->
            <div class="flex gap-x-7 py-6">
              <svg
                class="flex-shrink-0 w-6 h-6 mt-1.5 text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"
                />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
              </svg>
              <div class="grow">
                <h3 class="font-semibold text-slate-800">Contact us by email</h3>
                <p class="mt-1 text-sm text-slate-500">
                  If you wish to write us an email instead please use
                </p>
                <a
                  class="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-slate-800 hover:text-slate-900"
                  href="#"
                >
                  example@site.com
                </a>
              </div>
            </div>
            <!-- End Icon Block -->
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
