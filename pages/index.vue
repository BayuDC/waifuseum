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
        <template #tail>
            <div class="flex justify-center">
                <Button to="/albums">View More</Button>
            </div>
        </template>
    </Section>
</template>
<style scoped></style>
