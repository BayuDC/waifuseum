<script lang="ts" setup>
const props = defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="py-12">
        <div class="container mx-auto max-w-screen-xl px-5 md:px-10">
            <h1 class="font-bold text-4xl text-center italic">{{ title }}</h1>
            <div class="w-full h-2 bg-green mt-4 mb-8 rounded-md" />
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
