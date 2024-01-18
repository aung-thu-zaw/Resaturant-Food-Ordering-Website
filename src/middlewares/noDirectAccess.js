export default function noDirectAccess(to, from, next) {
  if (from.path.startsWith('/errors') || from.path === '/errors') {
    next({ name: 'home' })
  } else {
    next()
  }
}
