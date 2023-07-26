<script lang="ts" setup>
const { data } = await useMyFetch<{ albums: Album[] }>('/albums?count=12');
</script>

<template>
    <Section title="Recent Albums">
        <Grid>
            <AlbumItem v-for="(album, i) in data?.albums" :key="album.id" :album="album" />
        </Grid>
        <template #tail>
            <div class="flex justify-center">
                <Button to="/albums" icon="pepicons:triangle-right-filled" ignore-hide-text>View More</Button>
            </div>
        </template>
    </Section>
</template>
<style scoped></style>
