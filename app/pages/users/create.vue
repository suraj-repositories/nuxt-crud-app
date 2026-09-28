<script setup lang="ts">
import { useNotification } from '~/types/useNotification'

const { createUser, uploadUserImage } = useUsers()
const { showSuccess, showError } = useNotification()
useHead({ title: "Create User" })
const form = reactive({
    name: '',
    dob: '',
    email: '',
    password: ''
})

const image = ref<File | null>(null)
const loading = ref(false)

const handleImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    image.value = target.files?.[0] ?? null
}

const handleSubmit = async () => {
    loading.value = true

    try {
        const response = await createUser({
            name: form.name,
            dob: form.dob,
            email: form.email,
            password: form.password
        })

        const userId = response.data.id

        if (image.value) {
            const formData = new FormData()
            formData.append('image', image.value)

            await uploadUserImage(userId, formData)
        }
        showSuccess('User created successfully')
        await navigateTo('/users')
    } catch (error: any) {
        console.error(error)

        showError(
            error?.data?.message ||
            error?.message ||
            'Failed to create user.'
        )
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="card py-4 px-2" style="max-width: 30rem;">
        <div class="container mt-3">
            <h3 class="text-primary">
                <NuxtLink to="/users">
                    <i class="bx bx-left-arrow-alt" />
                </NuxtLink>

                <u><b>Create User</b></u>
            </h3>

            <form class="mt-3" @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label for="full-name" class="form-label">
                        Full name
                        <span class="text-danger">*</span>
                    </label>

                    <input id="full-name" v-model="form.name" type="text" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label for="dob" class="form-label">
                        Date of birth
                        <span class="text-danger">*</span>
                    </label>

                    <input id="dob" v-model="form.dob" type="date" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">
                        Email address
                        <span class="text-danger">*</span>
                    </label>

                    <input id="email" v-model="form.email" type="email" class="form-control" required>

                    <div class="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">
                        Password
                        <span class="text-danger">*</span>
                    </label>

                    <input id="password" v-model="form.password" type="password" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label for="image" class="form-label">
                        Profile picture
                    </label>

                    <input id="image" type="file" class="form-control" accept="image/*" @change="handleImageChange">
                </div>

                <button type="submit" class="btn btn-dark mt-2" :disabled="loading">
                    {{ loading ? 'REGISTERING...' : 'REGISTER' }}
                </button>
            </form>

            <br>
        </div>
    </div>
</template>