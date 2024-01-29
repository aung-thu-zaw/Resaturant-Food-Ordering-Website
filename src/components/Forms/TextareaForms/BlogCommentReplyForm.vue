<script setup>
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { reactive } from 'vue'

defineProps({ blog: Object, comment: Object })

defineEmits('updateReplyBox')

const form = reactive({ reply: null })
</script>

<template>
  <div class="pl-12 mt-5">
    <form @submit.prevent="">
      <div class="mb-3">
        <TextAreaField
          name="reply-blog"
          placeholder="Enter Reply Message"
          required
          v-model="form.reply"
        />

        <InputError message="" />
      </div>

      <div class="border w-[100px] ml-auto">
        <FormButton type="submit"> Submit </FormButton>
      </div>
    </form>
  </div>
</template>
