<script lang="ts" setup>
definePageMeta({ layout: 'empty' });

const auth = reactive({
    email: '',
    password: '',
});
</script>

<template>
    <div class="max-w-screen-sm mx-auto">
        <Main>
            <Section title="Waifuseum" center-head>
                <Box>
                    <form action="">
                        <div class="flex flex-col gap-1 mb-4">
                            <InputText label="Email" v-model:value="auth.email" />
                            <InputText label="Password" v-model:value="auth.password" password />
                        </div>
                        <Button icon="ic:round-login" class="ml-auto">Login</Button>
                    </form>
                </Box>
                <div class="text-center mt-8 font-bold flex flex-wrap justify-center">
                    <NuxtLink class="hover:underline">Login with Discord</NuxtLink>
                    <span class="mx-2 hidden md:inline">|</span>
                    <NuxtLink class="hover:underline">Anonymous login</NuxtLink>
                </div>
            </Section>
        </Main>
    </div>
</template>

<style scoped></style>
