export const useNotification = () => {
    const message = useState<string | null>('notification-message', () => null)
    const type = useState<'success' | 'error'>(
        'notification-type',
        () => 'success'
    )

    const showSuccess = (text: string) => {
        message.value = text
        type.value = 'success'
    }

    const showError = (text: string) => {
        message.value = text
        type.value = 'error'
    }

    const clear = () => {
        message.value = null
    }

    return {
        message,
        type,
        showSuccess,
        showError,
        clear
    }
}