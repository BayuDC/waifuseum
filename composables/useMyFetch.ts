import { useFetch } from '#app';

type useFetchType = typeof useFetch;

export const useLiteFetch: useFetchType = (path, options?) => {
    const config = useRuntimeConfig();

    return useFetch(path, {
        baseURL: config.public.apiLiteUrl,
        ...options,
    });
};
export const useMainFetch: useFetchType = (path, options?) => {
    const config = useRuntimeConfig();

    return useFetch(path, {
        baseURL: config.public.apiMainUrl,
        credentials: 'include',
        ...options,
    });
};
