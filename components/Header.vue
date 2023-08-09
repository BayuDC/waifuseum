<script lang="ts" setup>
const route = useRoute();

const isDashboard = computed(() => {
    return route.path.startsWith('/dashboard');
});
</script>

<template>
    <header class="bg-black">
        <Container class="px-5 md:px-10">
            <div class="flex items-center justify-between h-20">
                <h1 class="font-bold text-green italic text-[32px]">
                    <NuxtLink to="/">Waifuseum</NuxtLink>
                </h1>
                <div>
                    <Transition name="blur" mode="out-in">
                        <Button v-if="isDashboard" to="/" icon="ic:round-home">Home</Button>
                        <Button v-else to="/dashboard/upload" icon="ic:round-upload">Upload</Button>
                    </Transition>
                </div>
            </div>
        </Container>
    </header>
</template>

<style scoped></style>
