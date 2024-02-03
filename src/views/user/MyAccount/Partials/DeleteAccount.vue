<script setup>
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import Modal from '@/Components/Modals/ModalContainer.vue'
import { ref } from 'vue'
import { useMyAccountStore } from '@/stores/user/myAccount'

const myAccountStore = useMyAccountStore()
const confirmingUserDeletion = ref(false)
const password = ref('')

const confirmUserDeletion = () => (confirmingUserDeletion.value = true)

const closeModal = () => (confirmingUserDeletion.value = false)

const deleteUser = async () => {
  await myAccountStore.deleteAccount(password.value)
}
</script>

<template>
  <div>
    <p class="mt-1 text-sm text-gray-700 font-medium mb-8">
      Once your account is deleted, all of its resources and data will be permanently deleted.
    </p>

    <NormalButton @click="confirmUserDeletion" class="bg-red-600 text-white">
      <i class="fa-solid fa-ban"></i>
      Delete Account
    </NormalButton>

    <Modal :show="confirmingUserDeletion" @close="closeModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900">
          Are you sure you want to delete your account?
        </h2>

        <div class="mt-6">
          <InputLabel label="Password" required />

          <InputField
            type="password"
            name="current-password"
            icon="fa-lock"
            v-model="password"
            placeholder="Enter Password"
            @keyup.enter="deleteUser"
            required
          />

          <InputError :message="myAccountStore.errors?.password" />
        </div>

        <div class="mt-6 flex justify-end space-x-5">
          <NormalButton @click="closeModal" class="bg-gray-500 text-white"> Cancel </NormalButton>

          <NormalButton class="bg-red-600 text-white" @click="deleteUser">
            Delete Account
          </NormalButton>
        </div>
      </div>
    </Modal>
  </div>
</template>