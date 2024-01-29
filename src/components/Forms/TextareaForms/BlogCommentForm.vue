<script setup>
import TextAreaField from '@/components/Forms/Fields/TextAreaField.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import { reactive } from 'vue'
import { useBlogStore } from '@/stores/restaurant/blog'

const props = defineProps({ blog: Object })

const store = useBlogStore()

const form = reactive({ comment: '' })

const handleCreateComment = async () => {
  try {
    await store.createComment(props.blog?.slug, form.comment)
    await store.getBlog(props.blog?.slug)
    window.scrollTo(0, 930)
    form.comment = ''
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="p-5">
    <form @submit.prevent="handleCreateComment">
      <div class="mb-3">
        <TextAreaField
          name="comment-blog"
          placeholder="Enter comment"
          v-model="form.comment"
          required
        />

        <InputError :message="store.errors?.comment" />
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
