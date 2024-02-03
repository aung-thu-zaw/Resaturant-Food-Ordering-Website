<script setup>
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FileInput from '@/components/Forms/Fields/FileInput.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { reactive, watch } from 'vue'
import { useMyAccountStore } from '@/stores/user/myAccount'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const accountStore = useMyAccountStore()
const authStore = useAuthStore()
const { currentUser, status } = storeToRefs(authStore)

const form = reactive({
  name: currentUser.value?.name,
  email: currentUser.value?.email,
  phone: currentUser.value?.phone,
  avatar: currentUser.value?.avatar
})

watch(
  () => currentUser.value,
  () => {
    form.name = currentUser.value?.name
    form.email = currentUser.value?.email
    form.phone = currentUser.value?.phone
    form.avatar = currentUser.value?.avatar
  }
)

const handleUpdateInformation = async () => {
  await accountStore.updatePersonalInformation(form)
  await authStore.getAuthenticatedUser()
}

const handleSendEmailVerification = async () => {
  await authStore.sendVerificationEmail()
}
</script>

<template>
  <div>
    <div class="flex flex-col items-center overflow-hidden py-5 space-y-3">
      <img
        :src="currentUser?.avatar"
        alt="avatar"
        class="rounded-full border border-slate-500 ring-2 ring-slate-200 w-32 h-32 object-cover"
      />

      <div class="text-center">
        <h1 class="font-bold text-xl gray-800">{{ currentUser?.name }}</h1>
      </div>
    </div>

    <div>
      <div v-show="currentUser?.email_verified_at === null" class="text-center">
        <p class="text-sm mt-2 text-main-orange">
          Your email address is unverified.
          <button
            @click="handleSendEmailVerification"
            type="button"
            class="underline text-sm font-semibold text-orange-600 hover:text-orange-500"
          >
            Click here to re-send the verification email.
          </button>
        </p>

        <div
          v-show="status === 'verification-link-sent'"
          class="mt-2 font-medium text-sm text-green-600"
        >
          A new verification link has been sent to your email address.
        </div>
      </div>

      <form @submit.prevent="handleUpdateInformation" class="space-y-4 md:space-y-6">
        <div>
          <InputLabel label="Name" required />

          <InputField
            type="text"
            name="user-name"
            icon="fa-user"
            v-model="form.name"
            placeholder="Enter Your Full Name"
          />

          <InputError :message="accountStore?.errors?.name" />
        </div>

        <div class="grid gird-cols-1 md:grid-cols-2 gap-5">
          <div>
            <InputLabel label="Email Address" required />

            <InputField
              type="email"
              name="user-email"
              icon="fa-envelope"
              v-model="form.email"
              placeholder="Enter Email Address"
            />

            <InputError :message="accountStore?.errors?.email" />
          </div>

          <div>
            <InputLabel label="Phone Number" />

            <InputField
              type="text"
              name="user-phone"
              icon="fa-phone"
              v-model="form.phone"
              placeholder="Enter Phone Number"
            />

            <InputError :message="accountStore?.errors?.phone" />
          </div>
        </div>

        <div>
          <InputLabel label="Avatar" />

          <FileInput
            name="avatar"
            text="PNG, JPG or JPEG ( Max File Size : 1.5 MB )"
            v-model="form.avatar"
          />

          <InputError :message="accountStore?.errors?.avatar" />
        </div>

        <FormButton> Save Changes </FormButton>
      </form>
    </div>
  </div>
</template>