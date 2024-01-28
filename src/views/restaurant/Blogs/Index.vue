<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import BlogCard from '@/components/Cards/BlogCard.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import BlogCategoryCard from '@/components/Cards/BlogCategoryCard.vue'
import FollowUsCard from '@/components/Cards/FollowUsCard.vue'
import BlogTagCard from '@/components/Cards/BlogTagCard.vue'
import BlogSortBy from '@/components/Forms/SelectBoxs/BlogSortBy.vue'
</script>

<template>
  <AppLayout>
    <section class="background">
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
              <div class="flex flex-wrap items-center justify-between space-y-3">
                <div class="w-[350px]">
                  <InputField type="text" name="search" placeholder="Search blog..." />
                </div>

                <div class="space-x-5 flex items-center">
                  <BlogSortBy />

                  <div class="p-3">
                    <label for="view" class="font-bold text-sm text-slate-800"> View : </label>

                    <a
                      href=""
                      class="px-2 py-1.5 rounded-md cursor-pointer transition-none mr-2 bg-orange-500 text-white hover:bg-orange-600"
                    >
                      <i class="fa-solid fa-grip"></i>
                    </a>

                    <a
                      href="#"
                      class="px-2 py-1.5 rounded-md cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300 transition-none"
                    >
                      <i class="fa-solid fa-list"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
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

            <div>
              <img
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/delicious-food-banner-template-design-cd3994e39458960f4f33e73b8c60edb9_screen.jpg?ts=1645769305"
                alt=""
              />
            </div>

            <div>
              <img
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-flyer-design-template-e0d64e8c474bb172a3f2fbce1135c9e6_screen.jpg?ts=1704443572"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('https://www.highspeedtraining.co.uk/hub/wp-content/uploads/2021/05/how-to-become-a-food-blogger-fi-1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
