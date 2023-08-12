<script lang="ts" setup>
defineProps<{
    title?: string;
    description: string;
    imgUrl: string;
}>();
</script>

<template>
    <div>
        <h2 v-if="title" class="mb-2 text-3xl md:text-4xl font-bold italic text-black/90">{{ title }}</h2>
        <p class="mt-4 text-lg font-medium italic">{{ description }}</p>
        <Box class="mt-2 h-60 max-w-4xl mx-auto">
            <div class="border-green border-[4px] rounded-lg overflow-hidden bg-green/20 aspect-video">
                <img :src="imgUrl" /></div
        ></Box>
        <slot />
    </div>
</template>

<style scoped></style>
