export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/profile') return

  const auth = useAuthStore()
  if (auth.isAuthed) return

  return navigateTo('/login')
})

