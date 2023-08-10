<script lang="ts" setup>
definePageMeta({
    layout: 'empty',
    middleware: ['auth-guest'],
});

const redirectUrl = useRoute().query.redirect as string;

const body = reactive({
    email: '',
    password: '',
});

const { data, error, execute } = await useMainFetch<{ message: string }>('/auth/login', {
    method: 'post',
    body,
    watch: false,
    immediate: false,
});
const { message, loading, submit } = useFormControl(execute);

async function onSubmit() {
    if (loading.value) return;

    await submit();

    if (error.value) {
        [message.error] = handleFormError(error.value);
    } else {
        message.success = data.value!.message;

        navigateTo(redirectUrl || '/', { replace: true });
    }
}

function onDiscordLogin() {
    useCookie('auth_redirect', { maxAge: 5 * 60 }).value = redirectUrl;
}
</script>

<template>
    <div class="max-w-screen-sm mx-auto">
        <Main>
            <Section title="Waifuseum" center-head>
                <Box>
                    <Form @submit="onSubmit" button-text="Login" v-bind="{ message, loading }">
                        <div class="flex flex-col gap-2 mb-4">
                            <InputText label="Email" v-model:value="body.email" required />
                            <InputText label="Password" v-model:value="body.password" required type="password" />
                        </div>
                    </Form>
                </Box>
                <div class="text-center mt-8 font-bold justify-center">
                    <NuxtLink class="hover:underline text-lg" to="/login/discord" @click="onDiscordLogin"
                        >Login with Discord</NuxtLink
                    >
                </div>
            </Section>
        </Main>
    </div>
</template>

<style scoped></style>
