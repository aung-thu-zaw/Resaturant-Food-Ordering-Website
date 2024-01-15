import { computed } from 'vue'

export function useSorting(routeName) {
  const params = computed(() => {
    return {
      //   sort: usePage().props.ziggy.query?.sort,
      //   direction: usePage().props.ziggy.query?.direction
      sort: 'id',
      direction: 'desc'
    }
  })

  const updateSorting = (sort = 'id') => {
    // params.value.sort = sort
    // params.value.direction = params.value.direction === 'asc' ? 'desc' : 'asc'
    // router.get(
    //   route(routeName),
    //   {
    //     search: usePage().props.ziggy.query?.search,
    //     page: usePage().props.ziggy.query?.page,
    //     per_page: usePage().props.ziggy.query?.per_page,
    //     sort: params.value.sort,
    //     direction: params.value.direction,
    //     created_from: usePage().props.ziggy.query?.created_from,
    //     created_until: usePage().props.ziggy.query?.created_until,
    //     deleted_from: usePage().props.ziggy.query?.deleted_from,
    //     deleted_until: usePage().props.ziggy.query?.deleted_until,
    //     filter_by_status: usePage().props.ziggy.query?.filter_by_status
    //   },
    //   {
    //     replace: true,
    //     preserveState: true,
    //     preserveScroll: true
    //   }
    // )
  }

  return {
    params,
    updateSorting
  }
}
