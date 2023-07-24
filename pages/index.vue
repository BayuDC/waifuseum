<script lang="ts" setup>
const { data } = await useMyFetch<{ albums: Album[] }>('/albums');
</script>

<template>
    <Section title="Recent Albums">Content here</Section>
</template>
<style scoped></style>
