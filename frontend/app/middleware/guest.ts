export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const auth = useAuthStore()
  auth.initFromStorage()

  if (auth.isAuthed) {
    return navigateTo('/home')
  }
})

