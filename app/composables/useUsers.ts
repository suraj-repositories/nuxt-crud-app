import type { ApiResponse } from '~/types/api'
import type { User, UsersData } from '~/types/user'

export const useUsers = () => {
  const config = useRuntimeConfig()

  const getUsers = (page: Ref<number>) => {
    return useFetch<ApiResponse<UsersData>>('/users', {
      baseURL: config.public.apiBase,
      query: {
        page
      }
    })
  }

  const getUser = (id: number) => {
    return useFetch<ApiResponse<User>>(`/users/${id}`, {
      baseURL: config.public.apiBase
    })
  }

  const createUser = (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    return $fetch<ApiResponse<User>>('/users', {
      method: 'POST',
      body: user,
      baseURL: config.public.apiBase
    })
  }

  const uploadUserImage = async (
    id: number,
    formData: FormData
  ) => {
    return await $fetch(`/users/${id}/image`, {
      method: 'PUT',
      body: formData, 
      baseURL: config.public.apiBase
    })
  }

  const updateUser = (id: number, user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return $fetch<ApiResponse<User>>(`/users/${id}`, {
      method: 'PUT',
      body: user,
      baseURL: config.public.apiBase
    })
  }

  const deleteUser = (id: number) => {
    return $fetch<ApiResponse<null>>(`/users/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase
    })
  }

  return {
    getUsers,
    getUser,
    createUser,
    uploadUserImage,
    updateUser,
    deleteUser
  }
}