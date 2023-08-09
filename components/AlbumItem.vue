<script lang="ts" setup>
const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps<{
    album: Album;
    tag?: string;
}>();

const target = ref<HTMLElement | null>(null);

usePopMotion(target, { opacity: 0, scale: 0 }, { opacity: 100, scale: 1, transition: { delay: useRandom(300) } });

const thumb = pickRandom(props.album.pictures)?.urls.thumbnail;
const tag = props.tag || props.album.tags[0]?.slug;
</script>

<template>
    <li ref="target" class="opacity-0">
        <Box :is="NuxtLink" :to="`/albums/${album.slug}`" class="hover:bg-green/10 transition group">
            <AlbumCover :url="thumb" :tag="tag" :count="album.picturesCount" />
            <AlbumInfo v-bind="{ name: album.name, alias: album.alias }" class="mt-2" />
        </Box>
    </li>
</template>

<style scoped></style>
