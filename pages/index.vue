<script lang="ts" setup>
const { data: recent } = await useLiteFetch<{ albums: Album[] }>('/albums/recent?count=12');
const { data: today } = await useLiteFetch<{ pictures: Picture[]; picturesCount: number }>('/pictures/today?count=12');

const index = ref(-1);
const picture = today.value?.pictures.length
    ? computed<Picture | null>(() => {
          if (index.value < 0 || index.value >= today.value!.pictures.length) return null;
          return today.value!.pictures[index.value];
      })
    : ref(null);
</script>

<template>
    <Main>
        <Section title="Today Upload" v-if="today?.pictures.length">
            <template #head>
                <p class="font-bold italic text-black/60">
                    <span class="text-black/100">{{ today.picturesCount }}</span>
                    pictures uploaded over the last 24 hours
                </p>
            </template>

            <Box>
                <Grid ref="list">
                    <PictureItem
                        v-for="(picture, i) in today.pictures"
                        :key="picture.id"
                        :picture="picture"
                        @click="index = i"
                        show-album
                    />
                </Grid>
            </Box>

            <Transition name="blur">
                <PictureStory
                    v-if="picture"
                    key="iloveyou"
                    :picture="picture"
                    :show-prev="index > 0"
                    :show-next="index < today.pictures.length - 1"
                    @close="index = -1"
                    @prev="index--"
                    @next="index++"
                >
                    <PictureProgress :total="today.pictures.length" :current="index" />
                </PictureStory>
            </Transition>

            <!-- <template #tail>
                <div class="flex justify-end">
                    <Button to="/pictures/today" icon="pepicons:triangle-right-filled" ignore-hide-text>
                        View More
                    </Button>
                </div>
            </template> -->
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
