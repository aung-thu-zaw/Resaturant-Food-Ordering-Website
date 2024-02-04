import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useQueryStringParams() {
  const route = useRoute()

  const dashboardParams = computed(() => ({
    search: route.query?.search,
    page: route.query?.page ?? 1,
    per_page: route.query?.per_page ?? 10,
    sort: route.query?.sort ?? 'id',
    direction: route.query?.direction ?? 'desc',
    status: route.query?.status !== '' ? route.query.status : undefined,
    response: route.query?.response !== '' ? route.query.response : undefined,
    category: route.query?.category !== '' ? route.query.category : undefined,
    type: route.query?.type !== '' ? route.query.type : undefined,
    position: route.query?.position !== '' ? route.query.position : undefined
  }))

  const blogParams = computed(() => ({
    search: route.query?.search,
    page: route.query?.page ?? 1,
    sort: route.query?.sort ?? 'latest',
    view: route.query?.view ?? 'grid',
    category: route.query?.category !== '' ? route.query.category : undefined,
    tag: route.query?.tag !== '' ? route.query.tag : undefined
  }))

  const menuParams = computed(() => ({
    search: route.query?.search,
    page: route.query?.page ?? 1,
    sort: route.query?.sort ?? 'latest',
    category: route.query?.category !== '' ? route.query.category : undefined,
    rating: route.query?.rating !== '' ? route.query.rating : undefined
  }))

  return {
    dashboardParams,
    blogParams,
    menuParams
  }
}
