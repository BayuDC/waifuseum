<script lang="ts" setup>
defineProps<{ album: Album }>();
</script>

<template>
    <div class="p-4 bg-white rounded-2xl border-black border-4 h-full shadow-[4px_4px_0px_0px_black]">
        <PictureThumb :urls="album.pictures.map((p) => p.urls.thumbnail)" />
        <h3 class="font-bold italic text-lg mt-2">{{ album.name }}</h3>
    </div>
</template>

<style scoped></style>
