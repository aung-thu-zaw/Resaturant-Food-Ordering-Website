<script setup>
import { useRoute, useRouter } from 'vue-router'

defineProps({
  links: Array
})

const route = useRoute()
const router = useRouter()

const getCurrentPage = (newPage = 1) => {
  router.push({ query: { ...route.query, page: newPage } })
  window.scrollTo(0, 100)
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div v-if="links?.length > 3">
      <div class="flex flex-wrap -mb-1">
        <template v-for="(link, p) in links" :key="p">
          <div
            v-if="link.url === null"
            class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border border-gray-300 rounded-full"
            v-html="link.label"
          />

          <div v-else class="flex items-center">
            <button
              @click="getCurrentPage(link.label)"
              type="button"
              class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border border-slate-300 rounded-full hover:bg-white hover:text-purpleDark hover:border-purpleDark focus:border-purpleDark duration-200"
              :class="{
                'bg-purpleDark text-white hover:bg-red-500 hover:text-white':
                  link.label == route.query.page
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
