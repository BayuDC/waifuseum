<script lang="ts" setup>
const props = defineProps<{
    title: string;
}>();

const slots = useSlots();
</script>

<template>
    <div class="py-12">
        <div class="container mx-auto max-w-screen-xl px-5 md:px-10">
            <div v-if="title" class="mb-8">
                <h1 class="text-4xl md:text-6xl font-bold italic text-black/90">{{ title }}</h1>
            </div>
            <div>
                <slot />
            </div>
            <div v-if="slots.tail" class="mt-8">
                <slot name="tail" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
