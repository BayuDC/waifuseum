<script lang="ts" setup>
defineProps<{
    name: string;
    value: string;
    url?: string;
}>();
</script>

<template>
    <li class="font-bold italic grid grid-cols-1">
        <div class="text-sm text-black/60 leading-none">{{ name }}</div>
        <div class="text-lg truncate">
            <template v-if="!url">{{ value }}</template>
            <NuxtLink v-else :to="url" class="underline" target="_blank">{{ value }}</NuxtLink>
        </div>
    </li>
</template>

<style scoped></style>
