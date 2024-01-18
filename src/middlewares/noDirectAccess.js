export default function noDirectAccess(to, from, next) {
  if (to.path.startsWith('/errors') || to.path === '/errors') {
    next({ name: 'home' })
  } else {
    next()
  }
}
