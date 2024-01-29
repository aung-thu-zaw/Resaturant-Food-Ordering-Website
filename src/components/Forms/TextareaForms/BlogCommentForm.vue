<script setup>
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { reactive } from 'vue'

defineProps({ blog: Object })

const form = reactive({ comment: '' })
</script>

<template>
  <div class="p-5">
    <form @submit.prevent="">
      <div class="mb-3">
        <TextAreaField
          name="comment-blog"
          placeholder="Enter comment"
          v-model="form.comment"
          required
        />

        <InputError message="" />
      </div>

      <div class="border w-[150px] ml-auto">
        <FormButton>
          <i class="fa-solid fa-paper-plane"></i>
          Submit
        </FormButton>
      </div>
    </form>
  </div>
</template>
