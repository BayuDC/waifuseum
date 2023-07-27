<script lang="ts" setup></script>

<template>
    <header class="bg-black">
        <Container class="px-5 md:px-10">
            <div class="flex items-center justify-between h-20">
                <h1 class="font-bold text-green italic text-[32px]">
                    <NuxtLink to="/">Waifuseum</NuxtLink>
                </h1>
                <div>
                    <Button to="/upload" icon="ic:round-upload">Upload</Button>
                </div>
            </div>
        </Container>
    </header>
</template>

<style scoped></style>
