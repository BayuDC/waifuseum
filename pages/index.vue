<script lang="ts" setup>
const { data: albums } = await useLiteFetch<Album[]>('/albums?count=12', {
    transform: (data: any) => data.albums,
});
</script>

<template>
    <Main>
        <Section title="Recent Albums">
            <Grid>
                <AlbumItem v-for="(album, i) in albums" :key="album.id" :album="album" />
            </Grid>
            <template #tail>
                <div class="flex justify-center">
                    <Button to="/albums" icon="pepicons:triangle-right-filled" ignore-hide-text>View More</Button>
                </div>
            </template>
        </Section>
    </Main>
</template>
<style scoped></style>
