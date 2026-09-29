<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const handleError = () => {
  clearError({ redirect: '/' })
}

const errorMessage = computed(() => {
  if (props.error.statusMessage) return props.error.statusMessage
  if (props.error.message) return props.error.message

  switch (props.error.statusCode) {
    case 404:
      return 'Page Not Found'
    case 403:
      return 'Access Forbidden'
    case 500:
      return 'Internal Server Error'
    default:
      return 'Something went wrong'
  }
})
</script>

<template>
  <div class="error-wrapper">
    <div class="error-container">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <p class="error-message">{{ errorMessage }}</p>

      <button type="button" class="btn-home" @click="handleError">
        Go Home
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-wrapper {
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
}

.error-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  padding: 2rem;
}

.error-code {
  color: #dc3545;
  font-size: 72px;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1;
}

.error-message {
  color: #2f3132;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.btn-home {
  display: inline-block;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-home:hover {
  background-color: #0056b3;
}
</style>