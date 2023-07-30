<script lang="ts" setup>
const appConfig = useAppConfig();

const { data: recentAlbums } = await useLiteFetch<Album[]>('/albums?count=12', {
    transform: (data: any) => data.albums,
});

const featuredAlbums = ref<(Album | null)[]>([]);

featuredAlbums.value = await Promise.all(
    appConfig.featuredAlbums.map(async (albumId, i) => {
        const { data: album } = await useLiteFetch<Album>(`/albums/${albumId}`, {
            transform: (data: any) => data.album,
            key: 'featured' + i,
        });

        return album.value;
    }),
);
</script>

<template>
    <Main>
        <Section title="Featured">
            <Grid>
                <AlbumItem v-for="(album, i) in featuredAlbums" :key="album?.id" :album="album" />
            </Grid>
        </Section>
        <Section title="Recent Albums">
            <Grid>
                <AlbumItem v-for="(album, i) in recentAlbums" :key="album.id" :album="album" />
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
