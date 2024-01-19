import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useQueryStringParams() {
  const route = useRoute()

  const dashboardParams = computed(() => ({
    search: route.query?.search ?? '',
    page: route.query?.page ?? 1,
    per_page: route.query?.per_page ?? 5,
    sort: route.query?.sort ?? 'id',
    direction: route.query?.direction ?? 'desc'
  }))

  return {
    dashboardParams
  }
}
