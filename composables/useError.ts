import { FetchError } from 'ofetch';

export function showErrorSimplify(error: Ref<any>) {
    showError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.data.message,
    });
}

export function handleFormError(error: FetchError<any>): [message: string, validations: Record<string, string>] {
    return [error.data.message || '', error.data.details];
}
