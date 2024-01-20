<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  data: {
    type: Object
  }
})

const route = useRoute()
const router = useRouter()
const currentPage = ref(route.query?.page || 1)

const getCurrentPage = (newPage) => {
  currentPage.value = newPage
}

watch(
  () => currentPage.value,
  (newPage) => {
    router.push({ query: { ...route.query, page: newPage } })
  }
)
</script>

<template>
  <div v-if="data?.data?.length !== 0" class="flex flex-col items-center justify-center py-2">
    <p class="font-bold text-slate-600 text-xs mb-3">
      Showing {{ data.from }} - {{ data.to }} of
      {{ data.total }}
    </p>

    <!-- Pagination -->
    <div class="flex items-center justify-center">
      <div v-if="data?.links?.length > 3">
        <div class="flex flex-wrap -mb-1">
          <div v-for="(link, p) in data.links" :key="p">
            <div
              v-if="link.url === null"
              class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-slate-300 rounded-md"
              v-html="link.label"
            />

            <div v-else class="flex items-center">
              <button
                @click="getCurrentPage(link.label)"
                type="button"
                class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-slate-300 rounded-md hover:bg-white hover:text-primary hover:border-primary focus:border-primary duration-200"
                :class="{
                  'bg-primary text-white hover:bg-red-500 hover:text-white':
                    link.label == currentPage
                }"
              >
                <span v-html="link.label"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- :href="link.url" -->
