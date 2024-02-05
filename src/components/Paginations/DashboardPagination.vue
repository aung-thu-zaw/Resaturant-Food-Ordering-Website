<script setup>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  data: {
    type: Object
  }
})

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['updatedData'])

// const getCurrentPage = (newPage = 1) => router.push({ query: { ...route.query, page: newPage } })

const fetchData = async (url, pageNumber, currentPage) => {
  try {
    let newPage = pageNumber
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true,
      withXSRFToken: true
    })

    if (!response) throw new Error('Response Not Found!')

    if (typeof pageNumber !== 'number' && pageNumber === 'Next &raquo;') {
      newPage = currentPage + 1
    } else if (typeof pageNumber !== 'number' && pageNumber === '&laquo; Previous') {
      newPage = currentPage - 1
    }

    router.push({ query: { ...route.query, page: newPage } })

    emit('updatedData', response.data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div v-if="data?.data?.length !== 0" class="flex flex-col items-center justify-center py-2">
    <p class="font-bold text-slate-600 text-xs mb-3">
      Showing {{ data?.from }} - {{ data?.to }} of
      {{ data?.total }}
    </p>

    <!-- Pagination -->
    <div class="flex items-center justify-center">
      <div v-if="data?.links?.length > 3">
        <div class="flex flex-wrap -mb-1">
          <div v-for="(link, p) in data?.links" :key="p">
            <div
              v-if="link.url === null"
              class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-slate-300 rounded-md"
              v-html="link.label"
            />

            <div v-else class="flex items-center">
              <button
                @click="fetchData(link.url, link.label, data.current_page)"
                type="button"
                class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-slate-300 rounded-md hover:bg-white hover:text-primary hover:border-primary focus:border-primary duration-200"
                :class="{
                  'bg-primary text-white hover:bg-orange-600 hover:text-white':
                    link.label == data.current_page
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
