<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import Editor from '@tinymce/tinymce-vue'
import { reactive } from 'vue'
import { useNewsletterStore } from '@/stores/dashboard/newsletter'

useTitle('Send Newsletter - Restaurant Food Ordering')

const store = useNewsletterStore()
const form = reactive({ subject: '', content: '' })

const handleSendNewsletter = async () => {
  await store.sendNewsletter({ ...form })

  form.subject = ''
  form.content = ''
}
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb
          to="admin.send-newsletter"
          icon="fa-envelope-open-text"
          label="Send Newsletter"
        />

        <div class="w-auto flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleSendNewsletter" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Subject" required />

            <InputField
              type="text"
              name="subject"
              v-model="form.subject"
              placeholder="Enter Subject"
              required
            />

            <InputError :message="store.errors?.subject" />
          </div>

          <div>
            <InputLabel label="Content" required />

            <Editor
              api-key="8989xh54aozrv1xkgo7je7p1ec6fv5gh34frv9uhf2b61jku"
              :init="{
                toolbar_mode: 'sliding',

                toolbar:
                  'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',

                tinycomments_mode: 'embedded'
              }"
              v-model="form.content"
            />

            <InputError :message="store.errors?.content" />
          </div>

          <div class="flex items-center justify-end w-full space-x-5">
            <FormButton class="w-[150px] text-white bg-blue-600 hover:bg-blue-700 rounded-md">
              <i class="fa-solid fa-paper-plane"></i>
              Send Newsletter
            </FormButton>
          </div>
        </form>
      </div>
      <!-- Form End -->
    </div>
  </DashboardLayout>
</template>

<style>
.tox-tinymce {
  border: 1px solid rgb(209, 213, 219) !important;
}

.tox .tox-edit-area iframe {
  background: rgb(249, 250, 251) !important;
}
</style>
