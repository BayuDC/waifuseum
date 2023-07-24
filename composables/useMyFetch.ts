import { useFetch } from '#app';

type useFetchType = typeof useFetch;

const useMyFetch: useFetchType = (path, options?) => {
    const appConfig = useAppConfig();

    return useFetch(path, {
        baseURL: appConfig.apiUrl,
        ...options,
    });
};

export default useMyFetch;
