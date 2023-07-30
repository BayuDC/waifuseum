<script lang="ts" setup>
definePageMeta({
    layout: 'empty',
    middleware: ['auth-guest'],
});

const loading = ref(false);

const body = reactive({
    email: '',
    password: '',
});

const { error, execute } = await useMainFetch('/auth/login', {
    method: 'post',
    body,
    watch: false,
    immediate: false,
});

async function handleLogin() {
    if (loading.value) return;

    error.value = null;
    loading.value = true;
    await execute();
    loading.value = false;

    if (!error.value) {
        navigateTo('/dashboard/upload', { replace: true });
    }
}
</script>

<template>
    <div class="max-w-screen-sm mx-auto">
        <Main>
            <Section title="Waifuseum" center-head>
                <Box>
                    <form @submit.prevent="handleLogin">
                        <div class="flex flex-col gap-1 mb-4">
                            <InputText label="Email" v-model:value="body.email" required />
                            <InputText label="Password" v-model:value="body.password" required password />
                        </div>
                        <div class="flex items-center justify-end gap-4">
                            <Transition name="page" mode="out-in">
                                <span v-show="error" class="font-semibold text-pink italic">{{
                                    error?.data.message
                                }}</span>
                            </Transition>
                            <Button :icon="loading ? 'line-md:loading-twotone-loop' : ''" ignore-hide-text
                                >Login</Button
                            >
                        </div>
                    </form>
                </Box>
                <div class="text-center mt-8 font-bold flex flex-wrap justify-center">
                    <NuxtLink class="hover:underline" to="/login/discord">Login with Discord</NuxtLink>
                    <span class="mx-2 hidden md:inline">|</span>
                    <NuxtLink class="hover:underline" to="/login/anonymous">Anonymous login</NuxtLink>
                </div>
            </Section>
        </Main>
    </div>
</template>

<style scoped></style>
