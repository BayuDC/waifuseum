<script lang="ts" setup>
const props = defineProps<{ urls: string[] }>();
const url = props.urls[Math.floor(Math.random() * 3)];
</script>

<template>
    <PictureThumb :url="url" class="" />
</template>

<style></style>
