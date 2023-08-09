<script lang="ts" setup>
const config = useRuntimeConfig();

definePageMeta({ layout: 'empty' });
navigateTo(config.public.discordAuthUrl, {
    external: true,
});
</script>

<template></template>

<style scoped></style>
