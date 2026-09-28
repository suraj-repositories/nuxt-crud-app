<script setup lang="ts">
import { useNotification } from '~/types/useNotification';

const {
    message,
    type,
    clear
} = useNotification()

watch(message, (value) => {
    if (value) {
        setTimeout(() => {
            clear()
        }, 3000)
    }
})
</script>

<template>
    <div v-if="message" class="alert position-fixed top-0 end-0 m-3 shadow"
        :class="type === 'success' ? 'alert-success' : 'alert-danger'" style="z-index: 9999;">
        {{ message }}

        <button type="button" class="btn-close ms-3" @click="clear"></button>
    </div>
</template>