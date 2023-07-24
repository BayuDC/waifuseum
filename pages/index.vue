<script lang="ts" setup>
const { data } = await useMyFetch<{ albums: Album[] }>('/albums?count=12');
</script>

<template>
    <Section title="Recent Albums">
        <ul class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            <li v-for="album in data?.albums" :key="album.id">
                <AlbumCard :album="album" />
            </li>
        </ul>
        <div class="flex justify-center mt-6">
            <Button to="/albums">View More</Button>
        </div>
    </Section>
</template>
<style scoped></style>
