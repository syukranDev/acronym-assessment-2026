import { defineStore } from 'pinia'
import { loginApi, type LoginRequest } from '../services/api/auth'
import { getUserProfileApi, type UserProfile } from '../services/api/user'

const LS_TOKEN_KEY = 'auth.token'
const LS_EXPIRES_AT_KEY = 'auth.expiresAt'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const expiresAt = ref<number | null>(null) // epoch ms
  const user = ref<UserProfile | null>(null)
  const logoutTimerId = ref<ReturnType<typeof setTimeout> | null>(null)

  const isExpired = computed(() => {
    if (!expiresAt.value) return true
    return Date.now() >= expiresAt.value
  })

  const isAuthed = computed(() => Boolean(token.value) && !isExpired.value)

  function parseJwtExpMs(jwt: string): number | null {
    try {
      const payload = jwt.split('.')[1]
      if (!payload) return null
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
      const json = atob(normalized)
      const data = JSON.parse(json) as { exp?: number }
      if (!data.exp) return null
      return data.exp * 1000
    } catch {
      return null
    }
  }

  function persistToLocalStorage() {
    if (!import.meta.client) return
    if (token.value) localStorage.setItem(LS_TOKEN_KEY, token.value)
    else localStorage.removeItem(LS_TOKEN_KEY)

    if (expiresAt.value) localStorage.setItem(LS_EXPIRES_AT_KEY, String(expiresAt.value))
    else localStorage.removeItem(LS_EXPIRES_AT_KEY)
  }

  function clearLogoutTimer() {
    if (logoutTimerId.value) clearTimeout(logoutTimerId.value)
    logoutTimerId.value = null
  }

  function scheduleAutoLogout() {
    if (!import.meta.client) return
    clearLogoutTimer()
    if (!expiresAt.value) return
    const ms = expiresAt.value - Date.now()
    if (ms <= 0) {
      logout()
      return
    }
    logoutTimerId.value = setTimeout(() => {
      logout()
    }, ms)
  }

  async function login(payload: LoginRequest) {
    const res = await loginApi(payload)
    if (res.status !== 'success' || !res.data?.token) {
      throw new Error(res.message || 'Login failed')
    }

    token.value = res.data.token
    user.value = res.data.user
      ? {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          created_at: res.data.user.created_at ?? null,
          updated_at: res.data.user.updated_at ?? null
        }
      : null
    expiresAt.value = parseJwtExpMs(res.data.token)
    persistToLocalStorage()
    scheduleAutoLogout()
  }

  async function fetchProfile() {
    if (!token.value) throw new Error('Missing token')
    const res = await getUserProfileApi(token.value)
    if (res.status !== 'success' || !res.data) {
      throw new Error(res.message || 'Failed to load profile')
    }
    user.value = res.data
  }

  function initFromStorage() {
    if (!import.meta.client) return
    const storedToken = localStorage.getItem(LS_TOKEN_KEY)
    const storedExpiresAt = localStorage.getItem(LS_EXPIRES_AT_KEY)

    token.value = storedToken || null
    expiresAt.value = storedExpiresAt ? Number(storedExpiresAt) : null

    if (!token.value || !expiresAt.value || Date.now() >= expiresAt.value) {
      logout()
      return
    }

    scheduleAutoLogout()
  }

  function logout() {
    clearLogoutTimer()
    token.value = null
    expiresAt.value = null
    user.value = null
    persistToLocalStorage()
  }

  return { token, expiresAt, user, isAuthed, isExpired, login, fetchProfile, initFromStorage, logout }
})

