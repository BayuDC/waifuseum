<script lang="ts" setup>
import Index from './index.vue';
const slug = useRoute().params.slug;
</script>

<template>
    <Index :tag="slug" />
</template>

<style scoped></style>
