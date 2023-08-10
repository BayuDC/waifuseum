<script lang="ts" setup>
const { data: recent } = await useLiteFetch<{ albums: Album[] }>('/albums/recent?count=12');
const { data: today } = await useLiteFetch<{ pictures: Picture[]; picturesCount: number }>('/pictures/today?count=12');
</script>

<template>
    <Main>
        <Section title="Today Upload" v-if="today?.picturesCount">
            <template #head>
                <p class="font-bold italic text-black/60 text-lg">
                    <span class="text-black/100">{{ today.picturesCount }}</span>
                    pictures uploaded over the last 24 hours
                </p>
            </template>

            <PictureList :pictures="today.pictures" v-slot="props">
                <PictureItem v-bind="props" show-album />
            </PictureList>

            <template #tail v-if="today.picturesCount > 12">
                <div class="flex justify-end">
                    <Button to="/pictures/today" icon="pepicons:triangle-right-filled" ignore-hide-text>
                        View More
                    </Button>
                </div>
            </template>
        </Section>
        <Section title="Recent Albums">
            <Grid>
                <AlbumItem v-for="(album, i) in recent?.albums" :key="album.id" :album="album" />
            </Grid>
            <template #tail>
                <div class="flex justify-end">
                    <Button to="/albums" icon="pepicons:triangle-right-filled" ignore-hide-text> View More </Button>
                </div>
            </template>
        </Section>
    </Main>
</template>
<style scoped></style>
