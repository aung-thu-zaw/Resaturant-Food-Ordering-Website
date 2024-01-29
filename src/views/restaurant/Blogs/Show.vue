<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import BlogCategoryCard from '@/components/Cards/BlogCategoryCard.vue'
import BlogTagCard from '@/components/Cards/BlogTagCard.vue'
import FollowUsCard from '@/components/Cards/FollowUsCard.vue'
import RelatedBlogCard from '@/Components/Cards/RelatedBlogCard.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbLinkItem from '@/components/Breadcrumbs/BreadcrumbLinkItem.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import BlogCommentSection from '@/components/Sections/BlogCommentSection.vue'
import { useTitle } from '@vueuse/core'
import { useBlogStore } from '@/stores/restaurant/blog'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({ slug: String })
const store = useBlogStore()
const router = useRouter()
const route = useRoute()

const { blog, relatedBlogs } = storeToRefs(store)

const blogFilteredByTag = (tag) =>
  router.push({ name: 'blogs.index', query: { ...route.query, tag } })

const fetchData = async () => {
  await store.getBlog(props?.slug)
  useTitle(blog.value?.title + '- Restaurant Food Ordering')
  window.scrollTo(0, 0)
}

onMounted(async () => await fetchData())

watch(
  () => route.params,
  async () => await fetchData()
)
</script>

<template>
  <AppLayout>
    <div class="bg-gray-50">
      <div class="container mx-auto pt-10 py-20">
        <div class="mb-5">
          <Breadcrumb to="home" icon="fa-home" label="Home">
            <BreadcrumbLinkItem label="Blogs" to="blogs.index" />
            <BreadcrumbItem :label="blog?.title ?? ''" />
          </Breadcrumb>
        </div>

        <section class="mb-20">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-x-5">
            <div class="w-full py-5 col-span-3">
              <div class="border border-slate-300 shadow-lg rounded-md p-2">
                <img
                  :src="blog?.thumbnail"
                  :alt="blog?.title"
                  class="w-full max-h-[600px] object-cover"
                />
              </div>

              <h1 class="font-bold text-3xl text-purpleDark mt-8 mb-6">
                {{ blog?.title }}
              </h1>

              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-4">
                  <span
                    class="text-xs font-bold bg-orange-500 text-white py-1 px-3 rounded-sm shadow"
                  >
                    {{ blog?.blog_category?.name }}
                  </span>

                  <span class="font-bold text-slate-700 text-sm">
                    <i class="fa-solid fa-user"></i>
                    {{ blog?.author?.name }}
                  </span>

                  <span class="font-bold text-slate-700 text-sm">
                    <i class="fa-solid fa-clock"></i>
                    {{ blog?.published_at }}
                  </span>
                </div>

                <!-- Share Blog Social Icons Start -->
                <div class="hidden md:flex items-center">
                  <span class="font-bold text-slate-700 mr-3">
                    <i class="fa-solid fa-share-nodes"></i> Share :
                  </span>

                  <a href="#" target="_blank">
                    <i class="fa-brands fa-facebook mr-3 text-lg text-blue-600"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i class="fa-brands fa-twitter mr-3 text-lg text-sky-600"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i class="fa-brands fa-telegram mr-3 text-lg text-blue-500"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i class="fa-brands fa-whatsapp mr-3 text-lg text-emerald-600"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i class="fa-solid fa-link mr-3 text-sm text-slate-700"></i>
                  </a>
                </div>
                <!-- Share Blog Social Icons End -->
              </div>

              <hr class="my-3" />

              <!-- Blog Description -->
              <p v-html="blog?.content" class="text-slate-800 mb-5"></p>

              <!-- Blog Tags Start -->
              <div v-show="blog?.blog_tags?.length" class="flex items-center mb-5">
                <span class="font-bold text-slate-800 mr-3">Blog Tags :</span>
                <div class="flex items-center space-x-2">
                  <button
                    v-for="tag in blog?.blog_tags"
                    :key="tag.id"
                    type="button"
                    class="px-3 py-1 bg-orange-600 rounded-full text-white text-xs capitalize font-bold hover:bg-orange-700 transition-all"
                    @click="blogFilteredByTag(tag.name)"
                  >
                    {{ tag.name }}
                  </button>
                </div>
              </div>
              <!-- Blog Tags End -->

              <!-- Blog Comments Section -->
              <BlogCommentSection :blog="blog ?? {}" />
            </div>
            <div class="w-full py-5 col-span-1 space-y-8">
              <!-- Related Blog -->
              <div>
                <RelatedBlogCard :relatedBlogs="relatedBlogs" />
              </div>

              <!-- Categories -->
              <div>
                <BlogCategoryCard />
              </div>

              <!-- Tags -->
              <div>
                <BlogTagCard />
              </div>

              <FollowUsCard />
            </div>
          </div>
        </section>
      </div>
    </div>
  </AppLayout>
</template>
