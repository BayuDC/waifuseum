<script lang="ts" setup>
const emit = defineEmits<{
    (e: 'resolve-pixiv', id: string): void;
}>();

const picture = usePictureState();

const self = ref<HTMLDivElement | null>(null);
const { isOverDropZone } = useDropZone(self, (files) => {
    if (!files?.length) return;
    picture.file.value = files[0];
});

function onTextDrop(e: DragEvent) {
    const text = e.dataTransfer?.getData('Text');
    if (!text || !text.match(/^(https?:\/\/www\.)?pixiv\.net\/en\/artworks\/[0-9]+$/)) return;

    picture.body.value.pixivId = text.replace(/^(https?:\/\/www\.)?pixiv\.net\/en\/artworks\//, '');
}
</script>

<template>
    <div ref="self" @drop="onTextDrop">
        <slot :is-over="isOverDropZone" />
    </div>
</template>

<style scoped></style>
