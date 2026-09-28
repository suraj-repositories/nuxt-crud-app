import type { Pagination } from "./pagination"

export interface User {
  id: number
  name: string
  email: string
  dob: string
  image: string | null
  createdAt: string
  updatedAt: string
}

export interface UsersData {
  users: User[]
  pagination: Pagination
}