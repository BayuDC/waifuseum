<script lang="ts" setup>
const props = defineProps<{ album: Album }>();
const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
    <Box :is="NuxtLink" :to="`/albums/${album.id}`" class="hover:bg-green/20 transition group">
        <AlbumCover :urls="album.pictures.map((p) => p.urls.thumbnail)">
            <AlbumBadge :count="album.picturesCount" class="absolute -top-1 -right-1" />
            <AlbumTag
                v-if="album.tags.length"
                :tag="album.tags[0]"
                class="absolute origin-top-left -rotate-90 -left-1 -bottom-1 translate-y-full"
            />
        </AlbumCover>
        <div class="text-center">
            <h3 class="font-bold italic text-xl text-black/90 mt-2 group-hover:text-black/100 transition">
                {{ album.name }}
            </h3>
            <p v-if="album.alias" class="text-black/90 font-bold text-sm italic mt-0.5">{{ album.alias }}</p>
        </div>
    </Box>
</template>

<style scoped></style>
