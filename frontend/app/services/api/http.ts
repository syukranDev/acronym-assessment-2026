import axios from 'axios'

export const api = axios.create()

export function getApi() {
  const config = useRuntimeConfig()
  api.defaults.baseURL = config.public.apiBase || ''
  return api
}

