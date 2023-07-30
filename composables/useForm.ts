export default function useForm() {
    const message = reactive({
        success: '',
        error: '',
    });
    const loading = ref(false);

    return {
        message,
        loading,
        beforeSubmit() {
            message.error = '';
            message.success = '';
            loading.value = true;
        },
        afterSubmit() {
            loading.value = false;
        },
    };
}
