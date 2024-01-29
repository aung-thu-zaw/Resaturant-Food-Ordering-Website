<script setup>
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { reactive } from 'vue'
import { useBlogStore } from '@/stores/restaurant/blog'

const props = defineProps({ blog: Object, comment: Object })

const emit = defineEmits(['updateReplyBox'])

const store = useBlogStore()
const form = reactive({ reply: '' })

const handleCreateReply = async () => {
  try {
    await store.createReply(props.blog?.slug, props.comment?.id, form.reply)
    await store.getBlog(props.blog?.slug)
    if (!store.errors?.reply) {
      window.scrollTo(0, 930)
      form.reply = ''
      emit('updateReplyBox', false)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="pl-12 mt-5">
    <form @submit.prevent="handleCreateReply">
      <div class="mb-3">
        <TextAreaField
          name="reply-blog"
          placeholder="Enter Reply Message"
          v-model="form.reply"
          required
        />

        <InputError :message="store.errors?.reply" />
      </div>

      <div class="border w-[100px] ml-auto">
        <FormButton>
          <i class="fa-solid fa-paper-plane"></i>
          Submit
        </FormButton>
      </div>
    </form>
  </div>
</template>
