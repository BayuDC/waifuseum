<script lang="ts" setup>
const props = defineProps<{ urls: string[] }>();
const url = props.urls[Math.floor(Math.random() * 3)];
</script>

<template>
    <div class="relative">
        <PictureThumb :url="url" class="" />
        <slot />
    </div>
</template>

<style></style>
