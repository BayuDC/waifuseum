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
export function useFormControl(submit: () => Promise<any>) {
    const message = reactive({
        success: '',
        error: '',
    });
    const validations = ref<Record<string, string>>({});
    const loading = ref(false);

    return {
        message,
        validations,
        loading,
        async submit() {
            message.error = '';
            message.success = '';
            loading.value = true;

            await submit();

            loading.value = false;
        },
    };
}
