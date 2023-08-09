<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
});

const routes = [
    { text: 'Upload Picture', dest: '/dashboard/upload' },
    { text: 'Create Album', dest: '/dashboard/create-album' },
    { text: 'Create Tag', dest: '/dashboard/create-tag' },
];

const route = useRoute();
const user = useAuth();

async function handleLogout() {
    await logout();
    navigateTo('/');
}
</script>

<template>
    <Main>
        <Section>
            <div class="grid md:grid-cols-[1fr_240px] gap-4 items-start">
                <div>
                    <NuxtPage />
                </div>
                <div class="md:sticky md:top-[144px] md:mt-[92px]">
                    <Box>
                        <ul class="flex flex-col gap-1 font-bold">
                            <li v-for="r in routes">
                                <NuxtLink
                                    class="py-1 px-2 transition rounded-md block"
                                    :class="[
                                        route.path == r.dest
                                            ? 'bg-green/100 cursor-default'
                                            : 'bg-green/10 hover:bg-green/40',
                                    ]"
                                    :to="r.dest"
                                    >{{ r.text }}</NuxtLink
                                >
                            </li>
                            <li>
                                <button
                                    class="w-full text-left py-1 px-2 transition rounded-md block hover:bg-pink/40 bg-pink/10"
                                    @click="handleLogout"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </Box>
                    <Box class="mt-4 font-bold">
                        <p class="font-medium italic">
                            <span class="text-xs text-black/80">Logged in as</span>
                            <span v-once class="grid text-2xl truncate">{{ user?.name }}</span>
                        </p>
                    </Box>
                </div>
            </div>
        </Section>
    </Main>
</template>

<style scoped></style>
