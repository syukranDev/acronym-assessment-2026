import axios from 'axios'

export const api = axios.create()

export function getApi() {
  const config = useRuntimeConfig()
  const apiBase = String(config.public.apiBase || '').trim().replace(/\/+$/, '')
  api.defaults.baseURL = `${apiBase}/api`
  return api
}

