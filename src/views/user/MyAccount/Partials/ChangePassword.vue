<script setup>
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const form = reactive({
  current_password: '',
  password: '',
  password_confirmation: ''
})

const handleChangePassword = async () => {
  const response = await authStore.changePassword(form)

  if (response) {
    authStore.$patch({ authErrors: null })
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleChangePassword" class="space-y-4 md:space-y-6">
      <div>
        <InputLabel label="Current Password" required />

        <InputField
          type="password"
          name="current-password"
          icon="fa-lock"
          v-model="form.current_password"
          placeholder="Enter Your Current Password"
        />

        <InputError :message="authStore.errors?.current_password" />
      </div>
      <div>
        <InputLabel label="New Password" required />

        <InputField
          type="password"
          name="new-password"
          icon="fa-lock"
          v-model="form.password"
          placeholder="Enter New Password"
        />

        <InputError :message="authStore.errors?.password" />
      </div>

      <div>
        <InputLabel label="Confirm Password" required />

        <InputField
          type="password"
          name="password-confirmation"
          icon="fa-lock"
          v-model="form.password_confirmation"
          placeholder="Retype Password"
        />

        <InputError :message="authStore.errors?.password_confirmation" />
      </div>

      <FormButton> Save Changes </FormButton>
    </form>
  </div>
</template>