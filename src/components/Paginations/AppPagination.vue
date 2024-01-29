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

const fetchData = async (url, pageNumber, currentPage) => {
  try {
    let newPage = pageNumber
    const response = await axios.get(url)

    if (!response) throw new Error('Response Not Found!')

    if (typeof pageNumber !== 'number' && pageNumber === 'Next &raquo;') {
      newPage = currentPage + 1
    } else if (typeof pageNumber !== 'number' && pageNumber === '&laquo; Previous') {
      newPage = currentPage - 1
    }

    if (route.query?.length) router.push({ query: { ...route.query, page: newPage } })

    emit('updatedData', response.data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div v-if="data?.links?.length > 3">
      <div class="flex flex-wrap -mb-1">
        <template v-for="(link, p) in data?.links" :key="p">
          <div
            v-if="link.url === null"
            class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border border-gray-300 rounded-full"
            v-html="link.label"
          />

          <div v-else class="flex items-center">
            <button
              @click="fetchData(link.url, link.label, data.current_page)"
              type="button"
              class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-slate-300 rounded-full hover:bg-white hover:text-purpleDark hover:border-purpleDark focus:border-purpleDark duration-200"
              :class="{
                'bg-purpleDark text-white hover:bg-indigo-950 hover:text-white':
                  link.label == data.current_page
              }"
              :href="link.url"
            >
              <span v-html="link.label"></span>
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
