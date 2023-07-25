<script lang="ts" setup>
const props = defineProps<{ album: Album }>();
</script>

<template>
    <NuxtLink
        :to="`/albums/${album.id}`"
        class="block p-4 bg-[#FFFFFF] rounded-2xl border-black border-4 h-full shadow-[4px_4px_0px_0px_black] hover:bg-green/20 transition group relative"
    >
        <AlbumCover :urls="album.pictures.map((p) => p.urls.thumbnail)" />
        <div class="text-center">
            <h3 class="font-bold italic text-xl text-black/90 mt-2 group-hover:text-black/100 transition">
                {{ album.name }}
            </h3>
            <p v-if="album.alias" class="text-black/90 font-bold text-sm italic mt-0.5">{{ album.alias }}</p>
        </div>
        <AlbumBadge :count="album.picturesCount" />
    </NuxtLink>
</template>

<style scoped></style>
