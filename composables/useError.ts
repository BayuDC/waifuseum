export function showErrorSimplify(error: Ref<any>) {
    showError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.data.message,
    });
}
