<script lang="ts" setup>
const props = defineProps<{
    picture: Picture;
}>();
const date = new Date(props.picture.createdAt).toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});
</script>

<template>
    <PictureCover :url="picture.urls.thumbnail" :date="date" />
</template>

<style scoped></style>
