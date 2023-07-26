<script lang="ts" setup>
const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps<{
    album: Album;
}>();

const target = ref<HTMLElement | null>(null);

const { apply } = useMotion(target, {
    initial: {
        opacity: 0,
        scale: 0,
    },
});
useAppear(target, () => {
    const delay = Math.random() * 300;
    apply({
        opacity: 100,
        scale: 1,
        transition: { delay },
    });
});

const thumb = props.album.pictures[Math.floor(Math.random() * props.album.pictures.length)].urls.thumbnail;
const tag = props.album.tags[0]?.slug;
</script>

<template>
    <li ref="target" class="opacity-0">
        <Box :is="NuxtLink" :to="`/albums/${album.id}`" class="hover:bg-green/10 transition group">
            <AlbumCover :url="thumb" :tag="tag" :count="album.picturesCount" />
            <AlbumInfo v-bind="{ name: album.name, alias: album.alias }" class="mt-2" />
        </Box>
    </li>
</template>

<style scoped></style>
