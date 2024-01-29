<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import BlogGridCard from '@/components/Cards/BlogGridCard.vue'
import BlogListCard from '@/components/Cards/BlogListCard.vue'
import BlogCategoryCard from '@/components/Cards/BlogCategoryCard.vue'
import FollowUsCard from '@/components/Cards/FollowUsCard.vue'
import BlogTagCard from '@/components/Cards/BlogTagCard.vue'
import BlogSortBy from '@/components/Forms/SelectBoxs/BlogSortBy.vue'
import Pagination from '@/components/Paginations/AppPagination.vue'
import FilterSearchBox from '@/components/Forms/SearchBoxs/FilterSearchBox.vue'
import BlogFilteredByTags from '@/components/BlogFilteredByTags.vue'
import { useTitle } from '@vueuse/core'
import { useBlogStore } from '@/stores/restaurant/blog'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useQueryStringParams } from '@/composables/useQueryStringParams'
import { useRoute, useRouter } from 'vue-router'

useTitle('Blogs - Restaurant Food Ordering')

const router = useRouter()
const route = useRoute()
const store = useBlogStore()

const { blogs } = storeToRefs(store)
const { blogParams } = useQueryStringParams()

onMounted(async () => {
  await store.getAllBlogs(blogParams.value)
  window.scrollTo(0, 0)
})

const handleView = (view) => router.push({ query: { ...route.query, view } })

watch(
  () => route.query,
  async () => await store.getAllBlogs(blogParams.value)
)

const handleUpdatedData = (data) => {
  store.$patch({ data: data })
  window.scrollTo(0, 290)
}
</script>

<template>
  <AppLayout>
    <section class="background" data-aos="zoom-out" data-aos-duration="1000">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">Our News & Blogs</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">Blogs</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-x-5">
          <div class="w-full py-5 col-span-3 space-y-5">
            <div class="border-b border-b-gray-300 pb-5">
              <div class="flex flex-wrap items-center justify-between">
                <FilterSearchBox placeholder="Search blog..." />

                <div class="space-x-5 flex items-center">
                  <BlogSortBy />

                  <div class="p-3">
                    <label for="view" class="font-bold text-sm text-slate-800"> View : </label>

                    <button
                      @click="handleView('grid')"
                      type="button"
                      class="px-2 py-1 rounded-md cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300 transition-none"
                      :class="{
                        'bg-orange-500 text-white hover:bg-orange-600':
                          route.query?.view === 'grid' || !route.query?.view
                      }"
                    >
                      <i class="fa-solid fa-grip"></i>
                    </button>

                    <button
                      @click="handleView('list')"
                      type="button"
                      class="px-2 py-1 rounded-md cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300 transition-none ml-2"
                      :class="{
                        'bg-orange-500 text-white hover:bg-orange-600': route.query?.view === 'list'
                      }"
                    >
                      <i class="fa-solid fa-list"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Filtered By -->
            <BlogFilteredByTags :total="blogs?.total" />

            <div v-if="blogs?.data?.length">
              <div
                v-if="route.query?.view === 'grid'"
                class="grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <BlogGridCard
                  v-for="blog in blogs.data"
                  :key="blog.id"
                  :blog="blog"
                  data-aos="fade-in"
                  data-aos-duration="1000"
                />
              </div>
              <div v-if="route.query?.view === 'list'">
                <BlogListCard
                  v-for="blog in blogs.data"
                  :key="blog.id"
                  :blog="blog"
                  data-aos="fade-in"
                  data-aos-duration="1000"
                />
              </div>

              <div class="flex items-center justify-center mt-14">
                <Pagination :data="blogs" @updatedData="handleUpdatedData" />
              </div>
            </div>

            <div v-else class="py-20">
              <p class="text-center font-bold text-md text-red-600">
                <i class="fa-solid fa-file-circle-xmark"></i>
                "We're sorry we can't find any matches for your filter term.
              </p>
            </div>
          </div>

          <div class="w-full py-5 col-span-1 space-y-8">
            <!-- Categories -->
            <div>
              <BlogCategoryCard />
            </div>

            <!-- Tags -->
            <div>
              <BlogTagCard />
            </div>

            <!-- Follow Us -->
            <div>
              <FollowUsCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('../../../assets/images/blog-cover.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
