<script setup lang="ts">
import { useNotification } from '~/types/useNotification'
const { getUsers, deleteUser } = useUsers()
const { showSuccess, showError } = useNotification()

const currentPage = ref(1)

useHead({ title: "Users List" })

const {
    data: response,
    pending,
    error,
    refresh
} = await getUsers(currentPage)

const users = computed(() => response.value?.data.users ?? [])
const pagination = computed(() => response.value?.data.pagination)

const goToPage = (page: number) => {
    if (!pagination.value) return
    if (page < 1 || page > pagination.value.totalPages) return

    currentPage.value = page
}

const handleDeleteUser = async (id: number) => {
    try {
        await deleteUser(id)
        await refresh()
        showSuccess("User deleted successfully");
    } catch (error) {
        console.error('Failed to delete user:', error)
        showError("Failed to delete user!");
    }
}

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.src = '/assets/images/default-user.png'
}
</script>

<template>
    <div class="card py-4 px-2">
        <div class="container mt-3">
            <div class="d-flex g-3 justify-content-between align-items-center">
                <h3 class="text-primary py-2">
                    <u><b>CRUD Application</b></u>

                </h3>
            </div>

            <br>

            <div class="d-flex g-3">
                <NuxtLink to="/users/create"
                    class="btn btn-dark d-flex align-items-center justify-content-center btn-md">
                    <i class="bx bxs-user-plus me-2 fs-4" />
                    Create User
                </NuxtLink>
            </div>

            <div class="scroll-box mt-4">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" class="col-1">#</th>
                            <th scope="col" class="col-3">Name</th>
                            <th scope="col" class="col-2">DOB</th>
                            <th scope="col" class="col-4">Email</th>
                            <th scope="col" class="col-2 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="pending">
                            <td colspan="5" class="text-center py-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2">
                                        <path stroke-dasharray="18" d="M12 3c4.97 0 9 4.03 9 9">
                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s"
                                                values="18;0" />
                                            <animateTransform attributeName="transform" dur="1.5s"
                                                repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                        </path>
                                        <path stroke-dasharray="60"
                                            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                                            opacity=".3">
                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s"
                                                values="60;0" />
                                        </path>
                                    </g>
                                </svg>

                            </td>
                        </tr>

                        <tr v-else-if="error">
                            <td colspan="5" class="text-center py-4">
                                Failed to load users.
                            </td>
                        </tr>

                        <tr v-else-if="users.length === 0">
                            <td colspan="5" class="text-center py-4">
                                No users found
                            </td>
                        </tr>

                        <tr v-else v-for="(user, index) in users" :key="user.id">
                            <th scope="row">
                                {{ index + 1 }}
                            </th>

                            <td>
                                <div class="user">
                                    <img :src="user.image || '/assets/images/default-user.png'" alt="profile picture"
                                        @error="handleImageError">
                                    <span>{{ user.name }}</span>
                                </div>
                            </td>

                            <td>{{ user.dob }}</td>
                            <td>{{ user.email }}</td>

                            <td>
                                <div class="action-btns">
                                    <NuxtLink :to="`/users/${user.id}/edit`" class="btn btn-dark mx-2">
                                        <i class="bx bxs-edit fs-5" />
                                    </NuxtLink>

                                    <button type="button" class="btn btn-danger mx-2"
                                        @click="handleDeleteUser(user.id)">
                                        <i class="bx bxs-trash-alt fs-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <nav v-if="pagination && pagination.totalPages > 1" aria-label="Page navigation" class="d-flex">
                <ul class="pagination ms-auto">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button type="button" class="page-link" :disabled="currentPage === 1"
                            @click="goToPage(currentPage - 1)">
                            Previous
                        </button>
                    </li>

                    <li v-for="page in pagination.totalPages" :key="page" class="page-item"
                        :class="{ active: currentPage === page }">
                        <button type="button" class="page-link" @click="goToPage(page)">
                            {{ page }}
                        </button>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === pagination.totalPages }">
                        <button type="button" class="page-link" :disabled="currentPage === pagination.totalPages"
                            @click="goToPage(currentPage + 1)">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>