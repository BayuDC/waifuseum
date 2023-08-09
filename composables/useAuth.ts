interface AuthUser {
    id: string;
    name: string;
    email: string;
    abilities: string[];
}

export default function useAuth() {
    return useState<AuthUser | null>('auth', () => null);
}

export function isAuth() {
    const auth = useAuth();

    return auth.value != null;
}

export async function login(): Promise<boolean> {
    const auth = useAuth();

    const { data } = await useMainFetch<{ user: AuthUser } | null>('/auth/me');

    if (!data.value) {
        auth.value = null;
        return false;
    }

    auth.value = data.value.user;
    return true;
}

export async function logout(): Promise<void> {
    const auth = useAuth();

    await useMainFetch('/auth/logout', {
        method: 'post',
    });

    auth.value = null;
}
