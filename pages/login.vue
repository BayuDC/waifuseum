<script lang="ts" setup>
definePageMeta({ layout: 'empty' });
</script>

<template>
    <div class="max-w-screen-sm mx-auto">
        <Main>
            <Section title="Waifuseum" center-head>
                <Box>
                    <div class="flex flex-col gap-2 mb-4">
                        <InputText label="Username" />
                        <InputText />
                    </div>
                    <Button icon="ic:round-login" class="ml-auto">Login</Button>
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
