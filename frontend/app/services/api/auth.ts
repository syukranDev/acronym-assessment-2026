import { getApi } from './http'

export type LoginRequest = {
  email: string
  password: string
}

export type SignupRequest = {
  name: string
  email: string
  password: string
}

export type LoginResponse = {
  status: 'success' | 'error'
  message: string
  data?: {
    user: {
      id: string
      name: string
      email: string
      created_at?: string | null
      updated_at?: string | null
    }
    token: string
  }
}

export type SignupResponse = {
  status: 'success' | 'error'
  message: string
}

export async function loginApi(payload: LoginRequest) {
  const res = await getApi().post<LoginResponse>('/api/auth/login', payload)
  return res.data
}

export async function signupApi(payload: SignupRequest) {
  const res = await getApi().post<SignupResponse>('/api/auth/signup', payload)
  return res.data
}

