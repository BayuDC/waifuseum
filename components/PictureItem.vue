<script lang="ts" setup>
const props = defineProps<{
    picture: Picture;
    showDate?: boolean;
    showAlbum?: boolean;
}>();
const emit = defineEmits<{
    (e: 'click'): void;
}>();

const target = ref<HTMLElement | null>(null);

usePopMotion(target, { opacity: 0, y: 100 }, { opacity: 100, y: 0 });

const date = props.showDate ? usePrettyDate(props.picture.createdAt) : null;
const album = props.showAlbum ? props.picture.album?.name : null;
</script>

<template>
    <li ref="target" class="opacity-0 cursor-pointer" tabindex="0" @click="emit('click')">
        <PictureCover :url="picture.urls.thumbnail" :badge1="album" :badge2="date" />
    </li>
</template>

<style scoped></style>
