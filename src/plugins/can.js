import { useAbility } from '@/stores/ability'

export const Can = {
  install: (app) => {
    const abilityStore = useAbility()

    const can = (permission) => {
      return abilityStore.permissions.includes(permission)
    }

    app.mixin({
      methods: { can }
    })
  }
}
