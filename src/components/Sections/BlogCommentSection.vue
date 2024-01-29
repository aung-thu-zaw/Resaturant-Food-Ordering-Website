<script setup>
import BlogCommentCard from '@/components/Cards/BlogCommentCard.vue'
import BlogReplyCard from '@/components/Cards/BlogReplyCard.vue'
import BlogCommentForm from '@/components/Forms/TextareaForms/BlogCommentForm.vue'
import Pagination from '@/components/Paginations/AppPagination.vue'
import { useAuthStore } from '@/stores/auth'
import { useBlogStore } from '@/stores/restaurant/blog'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
})

onMounted(async () => {
  if (props.blog?.slug) {
    await blogStore.getBlog(props.blog?.slug)
  }
})

const blogStore = useBlogStore()
const authStore = useAuthStore()
const { comments } = storeToRefs(blogStore)
const { currentUser, isAuthenticated } = storeToRefs(authStore)

const handleUpdatedData = (data) => {
  blogStore.$patch({ specificData: data })
  window.scrollTo(0, 980)
}
</script>

<template>
  <section>
    <div class="border border-gray-300 bg-white rounded-sm shadow">
      <div class="border-b p-5">
        <p class="text-md font-semibold text-slate-600 mb-5">
          Total Comments ({{ comments?.total }})
        </p>

        <!-- Comments -->
        <div v-if="comments?.data?.length" class="space-y-5">
          <div
            v-for="comment in comments?.data"
            :key="comment.id"
            class="py-3 rounded-md border border-gray-300"
          >
            <!-- <p
              v-show="blogComment.status === 'pending'"
              class="text-center font-medium text-orange-600 text-xs my-3"
            >
              <i class="fa-solid fa-spinner animate-spin"></i>
              Your comment is awaiting moderation....
            </p> -->

            <!-- Comment Card -->
            <BlogCommentCard :blog="blog" :comment="comment" />

            <!-- Reply Card -->

            <div v-show="comment.blog_comment_responses.length">
              <BlogReplyCard
                v-for="response in comment.blog_comment_responses"
                :key="response.id"
                :blog="blog"
                :response="response"
              />
            </div>
          </div>
          <!-- Comment Pagination -->
          <div>
            <Pagination :data="comments" @updatedData="handleUpdatedData" />
          </div>
        </div>

        <div v-else class="py-5">
          <p class="text-center font-bold text-slate-700 text-md">
            <i class="fa-solid fa-comment-slash"></i>
            Comments Not Yet
          </p>
        </div>
      </div>

      <!-- Comment Form -->
      <div v-show="currentUser && isAuthenticated && currentUser?.id !== blog?.author_id">
        <BlogCommentForm :blog="blog" />
      </div>
      <div v-show="!currentUser && !isAuthenticated" class="py-5">
        <p class="text-center text-sm font-medium text-slate-600">
          If you want to write comments you need to login first. Here
          <router-link :to="{ name: 'login' }" class="font-bold text-orange-600 hover:underline">
            Sign In
          </router-link>
          Or
          <router-link :to="{ name: 'register' }" class="font-bold text-orange-600 hover:underline">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>
