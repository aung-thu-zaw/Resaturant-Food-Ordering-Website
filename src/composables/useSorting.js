import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useSorting(getAllMethod) {
  const route = useRoute()
  const router = useRouter()

  const params = computed(() => {
    return {
      sort: route.query?.sort,
      direction: route.query?.direction
    }
  })

  const updateSorting = async (sort = 'id') => {
    params.value.sort = sort
    params.value.direction = params.value.direction === 'asc' ? 'desc' : 'asc'

    await getAllMethod({
      ...route.query,
      sort: params.value.sort,
      direction: params.value.direction
    })

    router.push({
      query: { ...route.query, sort: params.value.sort, direction: params.value.direction }
    })
  }

  return {
    params,
    updateSorting
  }
}
