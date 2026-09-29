<script lang="ts" setup>
import { useNotification } from '~/types/useNotification'

useHead({
    title: 'Edit User'
})

const route = useRoute()
const userId = Number(route.params.id)

const { getUser, updateUser, uploadUserImage } = useUsers()
const { showSuccess, showError } = useNotification()

const form = reactive({
    name: '',
    dob: '',
    email: '',
    password: ''
})

const selectedImage = ref<File | null>(null)
const userImage = ref('')
const loading = ref(true)
const submitting = ref(false)

const { data: response, error } = await getUser(userId)

if (error.value) {
    showError('Failed to load user.')
} else if (response.value?.success) {
    const user = response.value.data
    form.name = user.name
    form.dob = user.dob
    form.email = user.email
    userImage.value = user.image || ''
}

loading.value = false

const handleImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0] ?? null

    selectedImage.value = file

    if (file) {
        userImage.value = URL.createObjectURL(file)
    }
}

const submitForm = async () => {
    submitting.value = true

    try {
        const updateResponse = await updateUser(userId, {
            name: form.name,
            dob: form.dob,
            email: form.email,
            ...(form.password ? { password: form.password } : {})
        })

        if (updateResponse.success) {
            if (selectedImage.value) {
                const formData = new FormData()
                formData.append('image', selectedImage.value)
                await uploadUserImage(userId, formData)
            }

            showSuccess('User updated successfully!')
            await navigateTo('/users')
        }
    } catch (err: any) {
        showError(err?.data?.message || 'Failed to update user.')
    } finally {
        submitting.value = false
    }
}

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.src = '/assets/images/default-user.png'
}
</script>

<template>
    <div class="card py-4 px-2" style="max-width: 30rem;">
        <div class="container mt-3">
            <h3 class="text-primary">
                <NuxtLink to="/users">
                    <i class="bx bx-left-arrow-alt" />
                </NuxtLink>
                <u><b>Update User</b></u>
            </h3>

            <div v-if="loading" class="text-center py-4">
                Loading user...
            </div>

            <form v-else class="mt-3" @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="full-name" class="form-label">
                        Full name <span class="text-danger">*</span>
                    </label>
                    <input id="full-name" v-model="form.name" type="text" class="form-control" name="name" required>
                </div>

                <div class="mb-3">
                    <label for="dob" class="form-label">
                        Date of birth <span class="text-danger">*</span>
                    </label>
                    <input id="dob" v-model="form.dob" type="date" class="form-control" name="dob" required>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">
                        Email address <span class="text-danger">*</span>
                    </label>
                    <input id="email" v-model="form.email" type="email" class="form-control" name="email" required>
                    <div class="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">
                        Password
                    </label>
                    <input id="password" v-model="form.password" type="password" class="form-control" name="password"
                        placeholder="Leave blank to keep current password">
                </div>

                <div class="mb-3">
                    <label for="image" class="form-label">
                        Profile picture
                    </label>
                    <div class="update-profile-pic">
                        <img :src="userImage || '/assets/images/default-user.png'" alt="profile picture"
                            @error="handleImageError">
                        <input id="image" type="file" class="form-control" name="image" accept="image/*"
                            @change="handleImageChange">
                    </div>
                </div>

                <button type="submit" class="btn btn-dark mt-2" :disabled="submitting">
                    {{ submitting ? 'UPDATING...' : 'UPDATE' }}
                </button>
            </form>
        </div>
    </div>
</template>