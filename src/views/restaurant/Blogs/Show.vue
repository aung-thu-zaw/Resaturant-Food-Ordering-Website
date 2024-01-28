<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import BlogCategoryCard from '@/components/Cards/BlogCategoryCard.vue'
import BlogTagCard from '@/components/Cards/BlogTagCard.vue'
import FollowUsCard from '@/components/Cards/FollowUsCard.vue'
import RelatedBlogCard from '@/Components/Cards/RelatedBlogCard.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
</script>

<template>
  <AppLayout>
    <div class="bg-gray-50">
      <div class="container mx-auto pt-10 py-20">
        <div class="mb-5">
          <Breadcrumb to="home" icon="fa-home" label="Home">
            <BreadcrumbItem label="Blogs" />
            <BreadcrumbItem label="Maxican Pizza Test Better" />
          </Breadcrumb>
        </div>

        <section class="mb-20">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-x-5">
            <div class="w-full py-5 col-span-3">
              <div class="border border-slate-300 shadow-lg rounded-md p-2">
                <img
                  src="https://www.proideators.com/wp-content/uploads/2022/07/How-To-Make-Your-Career-As-A-Food-Blogger-In-India-ProiDeators.jpg"
                  class="w-full max-h-[600px] object-cover"
                />
              </div>

              <h1 class="font-bold text-3xl text-purpleDark mt-8 mb-6">
                This is Our First Food Blog
              </h1>

              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-4">
                  <span
                    class="text-xs font-bold bg-orange-500 text-white py-1 px-3 rounded-sm shadow"
                  >
                    FoodMenu
                  </span>

                  <span class="font-bold text-slate-700 text-sm">
                    <i class="fa-solid fa-user"></i>
                    Admin
                  </span>

                  <span class="font-bold text-slate-700 text-sm">
                    <i class="fa-solid fa-clock"></i>
                    12-September-2023
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
              <p class="text-slate-800 mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi facilis
                distinctio iste, perspiciatis voluptas repellendus ea reprehenderit libero odit nemo
                harum assumenda, mollitia et repellat ratione quaerat velit, quasi vero?

                <br />

                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, inventore
                voluptate. Minima suscipit delectus laboriosam? Consectetur explicabo repellat odio
                beatae commodi nobis perferendis aspernatur temporibus expedita quam fugit at
                repellendus libero placeat nulla necessitatibus, soluta nihil. Eius, cumque sapiente
                aspernatur quos veniam rerum ratione eos eveniet, quidem enim blanditiis beatae?

                <br />

                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident vitae odit
                molestias nisi incidunt vero! Quam commodi, placeat nisi atque voluptatem odit
                eveniet iste labore nulla, magnam similique voluptate sint necessitatibus culpa
                autem dicta nobis nostrum dolorum sapiente corporis ducimus molestiae?
                Exercitationem iste numquam dolorem facere ipsam, earum ullam. Eligendi quisquam
                enim magnam quae perspiciatis sit inventore adipisci minima quidem, nobis quia
                consequatur sapiente unde blanditiis voluptas optio non dolorem praesentium laborum
                veniam repudiandae ratione! Dolores, laudantium? Voluptatibus impedit repellendus
                quam, ex ipsa perspiciatis nesciunt! Fuga pariatur sunt amet mollitia, quam autem ut
                illo? Voluptatem vel repellat architecto et pariatur?

                <br />

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perferendis quisquam
                dignissimos suscipit ipsam consectetur praesentium, excepturi impedit dolorum ullam
                exercitationem! Quidem sit accusantium ad? Quibusdam soluta non in delectus aperiam
                tempore corporis quasi illo, repellendus harum dicta maiores modi iure deserunt amet
                sint odio laboriosam, saepe, dolore odit magnam!
              </p>

              <!-- Blog Tags Start -->
              <div class="flex items-center mb-5">
                <span class="font-bold text-slate-800 mr-3">Blog Tags :</span>
                <div class="flex items-center space-x-2">
                  <button
                    type="button"
                    class="px-3 py-1 bg-orange-600 rounded-full text-white text-xs capitalize font-bold hover:bg-orange-700 transition-all"
                  >
                    Restaurant
                  </button>
                  <button
                    type="button"
                    class="px-3 py-1 bg-orange-600 rounded-full text-white text-xs capitalize font-bold hover:bg-orange-700 transition-all"
                  >
                    Food Menu
                  </button>
                  <button
                    type="button"
                    class="px-3 py-1 bg-orange-600 rounded-full text-white text-xs capitalize font-bold hover:bg-orange-700 transition-all"
                  >
                    Burger
                  </button>
                </div>
              </div>
              <!-- Blog Tags End -->

              <!-- Blog Comments Section -->
              <!-- <BlogCommentSection :blogContent="blogContent" :blogComments="blogComments" /> -->
            </div>
            <div class="w-full py-5 col-span-1 space-y-8">
              <!-- Related Blog -->
              <div>
                <RelatedBlogCard />
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