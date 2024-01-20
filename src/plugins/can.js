import { useAbilityStore } from '@/stores/dashboard/ability'

export const Can = {
  install: (app) => {
    const abilityStore = useAbilityStore()

    const can = (permission) => {
      return abilityStore.permissions.includes(permission)
    }

    app.mixin({
      methods: { can }
    })
  }
}
