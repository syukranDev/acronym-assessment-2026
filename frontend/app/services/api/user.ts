import { getApi } from './http'

export type UserProfile = {
  id: string
  name: string
  email: string
  created_at?: string | null
  updated_at?: string | null
}

export type UserProfileResponse = {
  status: 'success' | 'error'
  message: string
  data?: UserProfile
}

export const getUserProfileApi = async (token: string) => {
  const res = await getApi().get<UserProfileResponse>('/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

