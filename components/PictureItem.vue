<script lang="ts" setup>
const props = defineProps<{
    picture: Picture;
}>();

const target = ref<HTMLElement | null>(null);

usePopMotion(target, { opacity: 0, y: 100 }, { opacity: 100, y: 0 });

const date = new Date(props.picture.createdAt).toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});
</script>

<template>
    <li ref="target" class="opacity-0">
        <PictureCover :url="picture.urls.thumbnail" :date="date" />
    </li>
</template>

<style scoped></style>
