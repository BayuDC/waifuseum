interface AuthUser {
    id: string;
    name: string;
    email: string;
    abilities: string[];
}

export default function useAuth() {
    return useState<AuthUser | null>('auth', () => null);
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
