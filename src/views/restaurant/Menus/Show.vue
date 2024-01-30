<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import RelatedItemCarousel from '@/components/Carousels/RelatedItemCarousel.vue'
import ProductDetailImageGallery from '@/components/Galleries/ProductDetailImageGallery.vue'
import StarRating from '@/components/Ratings/StarRating.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbLinkItem from '@/components/Breadcrumbs/BreadcrumbLinkItem.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import ProductInformationTab from '@/components/Tabs/ProductInformationTab.vue'
import GreenBadge from '@/components/Badges/GreenBadge.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import { useMenuStore } from '@/stores/restaurant/menu'
import { storeToRefs } from 'pinia'
import { useFormatFunctions } from '@/composables/useFormatFunctions'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useMenuStore()

const { menu, relatedItems } = storeToRefs(store)
const { formatAmount } = useFormatFunctions()

const fetchData = async () => {
  await store.getMenu(props?.slug)
  useTitle(menu.value?.name + '- Restaurant Food Ordering')
  window.scrollTo(0, 0)
}

onMounted(async () => await fetchData())

const avgRating = computed(() => {
  const rawAvgRating = menu.value?.product_reviews_avg_rating

  const avgRatingValue = parseFloat(rawAvgRating)

  if (!Number.isNaN(avgRatingValue)) {
    return avgRatingValue.toFixed(1)
  }

  return null
})

watch(
  () => props.slug,
  async () => await fetchData()
)

const quantity = ref(1)

const increment = () =>
  quantity.value >= menu?.value?.qty ? (quantity.value = menu?.value?.qty) : quantity.value++

const decrement = () => (quantity.value <= 1 ? 1 : quantity.value--)
</script>

<template>
  <AppLayout>
    <div class="bg-gray-50">
      <div class="container mx-auto pt-10 py-20">
        <div class="mb-10 md:px-16">
          <Breadcrumb to="home" icon="fa-home" label="Home">
            <BreadcrumbLinkItem label="Menus" to="menus.index" />
            <BreadcrumbItem :label="menu?.name ?? ''" />
          </Breadcrumb>
        </div>

        <section class="mb-20 space-y-5">
          <div class="flex flex-col md:flex-row items-start md:space-x-5 space-y-5 md:space-y-0">
            <div class="w-full md:w-1/2" data-aos="fade-right" data-aos-duration="800">
              <ProductDetailImageGallery :product="menu ?? {}" />
            </div>
            <div
              class="w-full md:w-1/2 space-y-4 md:space-y-8"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <div class="space-y-5">
                <h1 class="font-extrabold text-3xl md:text-4xl text-purpleDark">
                  {{ menu?.name }}
                </h1>
                <div class="flex items-center justify-start space-x-3 text-sm md:text-md">
                  <StarRating :rating="avgRating" />
                  <span class="font-semibold text-slate-600 text-sm">
                    | &nbsp;&nbsp;{{ menu?.product_reviews_count ?? 0 }} Reviews
                  </span>
                </div>
              </div>

              <div class="flex items-center">
                <div>
                  <span class="text-gray-700 font-semibold text-sm mr-3">
                    Total {{ menu?.qty }} item(s) Available
                  </span>
                  <GreenBadge> In stock </GreenBadge>
                </div>
              </div>

              <div v-if="menu?.discount_price" class="space-x-3">
                <span class="text-purpleDark font-extrabold text-lg md:text-xl">
                  $ {{ formatAmount(menu?.discount_price) }}
                </span>
                <span class="text-orange-500 line-through text-sm md:text-md font-medium">
                  $ {{ formatAmount(menu?.base_price) }}
                </span>
              </div>

              <div v-else class="space-x-3">
                <span class="text-purpleDark font-extrabold text-lg md:text-xl">
                  $ {{ formatAmount(menu?.base_price) }}
                </span>
              </div>

              <!-- <div class="flex items-center justify-start space-x-5 w-full">
                <p class="font-semibold text-slate-800 text-sm md:mb-0 mb-3">Select Size :</p>

                <div class="flex items-center md:space-x-3 flex-wrap">
                  <button
                    type="button"
                    class="px-4 py-2 text-xs rounded-full font-semibold md:mb-0 md:ml-0 ml-3 mb-3 border border-gray-300 bg-orange-500 text-white"
                  >
                    Small ( + 1.5$ )
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 text-xs rounded-full font-semibold md:mb-0 md:ml-0 ml-3 mb-3 border border-gray-300"
                  >
                    Medium ( + 1.5$ )
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 text-xs rounded-full font-semibold md:mb-0 md:ml-0 ml-3 mb-3 border border-gray-300"
                  >
                    Large ( + 1.5$ )
                  </button>
                </div>
              </div> -->

              <div
                v-show="menu?.addons?.length"
                class="flex items-center justify-start space-x-5 w-full"
              >
                <p class="font-semibold text-slate-800 text-sm md:mb-0 mb-3 w-[100px]">Add-ons :</p>

                <div class="flex items-center space-x-3 flex-wrap md:flex-nowrap">
                  <button
                    v-for="addon in menu?.addons"
                    :key="addon?.id"
                    type="button"
                    class="px-4 py-2 text-xs rounded-md font-semibold md:ml-0 ml-3 mb-3 border border-orange-300 text-orange-500"
                  >
                    {{ addon?.name }} ( + {{ formatAmount(addon?.additional_price) }}$ )
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-start space-x-5">
                <p class="font-semibold text-slate-800 text-sm">Quantity :</p>

                <div class="flex items-center space-x-1.5 border border-gray-300 p-1 rounded-full">
                  <button
                    @click="increment"
                    type="button"
                    class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                  >
                    <i class="fa-solid fa-plus text-white"></i>
                  </button>

                  <input
                    type="number"
                    class="w-[50px] border-none font-semibold text-sm text-gray-800 outline-none border text-center bg-transparent"
                    v-model="quantity"
                  />

                  <button
                    @click="decrement"
                    type="button"
                    class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 mr-2 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                  >
                    <i class="fa-solid fa-minus text-white"></i>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-start space-x-3">
                <button
                  class="focus:ring-2 focus:ring-orange-300 text-white bg-orange-500 hover:bg-orange-600 rounded-full text-xs md:text-sm font-medium px-5 py-3 animate-press duration-200 transition-all"
                >
                  <i class="fa-solid fa-cart-plus"></i>
                  Add To Cart
                </button>

                <button
                  class="focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-white bg-purpleDark hover:bg-indigo-950 mr-2 rounded-full text-xs md:text-sm font-medium px-5 py-3 animate-press duration-200 transition-all"
                >
                  <i class="fa-solid fa-bag-shopping"></i>
                  Buy Now
                </button>

                <button class="px-5 text-xl text-gray-600 hover:text-orange-600">
                  <i class="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>
          </div>

          <ProductInformationTab :description="menu?.description" />
        </section>

        <section v-if="relatedItems?.length" class="space-y-10">
          <h1 class="font-bold text-md text-purpleDark text-3xl">Related Items</h1>

          <div>
            <RelatedItemCarousel :relatedItems="relatedItems" />
          </div>
        </section>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

.scrollbar::-webkit-scrollbar {
  height: 10px;
}
</style>
