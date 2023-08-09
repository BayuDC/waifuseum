<script lang="ts" setup>
definePageMeta({
    layout: 'empty',
    middleware: ['auth-guest'],
});

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
const { message, loading, beforeSubmit, afterSubmit } = useForm();

async function onSubmit() {
    if (loading.value) return;

    beforeSubmit();
    await execute();
    afterSubmit();

    if (error.value) {
        message.error = error.value.data.message;
    } else {
        message.success = data.value!.message;
        navigateTo('/dashboard/upload', { replace: true });
    }
}
</script>

<template>
    <div class="max-w-screen-sm mx-auto">
        <Main>
            <Section title="Waifuseum" center-head>
                <Box>
                    <Form @submit="onSubmit" button-text="Login" v-bind="{ message, loading }">
                        <div class="flex flex-col gap-1 mb-4">
                            <InputText label="Email" v-model:value="body.email" required />
                            <InputText label="Password" v-model:value="body.password" required password />
                        </div>
                    </Form>
                </Box>
                <div class="text-center mt-8 font-bold justify-center">
                    <NuxtLink class="hover:underline text-lg" to="/login/discord">Login with Discord</NuxtLink>
                </div>
            </Section>
        </Main>
    </div>
</template>

<style scoped></style>
