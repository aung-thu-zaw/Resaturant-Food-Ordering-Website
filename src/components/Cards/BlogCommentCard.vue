<script setup>
import BlogReplyForm from '@/components/Forms/TextareaForms/BlogCommentReplyForm.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

defineProps({ blog: Object, comment: Object })

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

const isReplyBoxOpened = ref(false)
</script>

<template>
  <div class="p-4">
    <div class="flex items-start justify-between">
      <div class="flex items-center mb-2">
        <img :src="comment.user?.avatar" alt="" class="w-10 h-10 object-cover rounded-full mr-2" />

        <div class="flex flex-col items-start">
          <h3 class="font-bold text-slate-700">{{ comment.user?.name }}</h3>
        </div>
      </div>

      <p class="text-slate-600 text-sm font-medium">
        {{ comment?.created_at }}
      </p>
    </div>

    <div class="pl-12">
      <p class="text-sm text-slate-700 font-medium">
        {{ comment?.comment }}
      </p>
    </div>

    <div v-show="blog?.author_id === currentUser?.id" class="flex items-center justify-end mt-3">
      <button
        v-if="!isReplyBoxOpened"
        @click="isReplyBoxOpened = !isReplyBoxOpened"
        class="font-medium text-xs text-slate-600 hover:text-orange-500"
      >
        <i class="fa-solid fa-comment-dots"></i>
        Reply
      </button>
      <button
        v-else
        @click="isReplyBoxOpened = false"
        class="font-medium text-xs text-red-600 hover:text-red-500"
      >
        <i class="fa-solid fa-circle-xmark"></i>

        Cancel
      </button>
    </div>

    <!-- Reply Form -->
    <div v-show="isReplyBoxOpened">
      <BlogReplyForm :blog="blog" :comment="comment" @updateReplyBox="isReplyBoxOpened = false" />
    </div>
  </div>
</template>
