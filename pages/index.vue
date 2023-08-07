<script lang="ts" setup>
const { data: albums } = await useLiteFetch<Album[]>('/albums?count=12', {
    transform: (data: any) => data.albums,
});
const { data: pictures } = await useLiteFetch<Picture[]>('/pictures?count=12', {
    transform: (data: any) => data.pictures,
});

const index = ref(-1);
const picture = pictures.value?.length
    ? computed<Picture | null>(() => {
          if (index.value < 0 || index.value >= pictures.value!.length) return null;
          return pictures.value![index.value];
      })
    : ref(null);
</script>

<template>
    <Main>
        <Section title="Today Upload" v-if="pictures?.length">
            <!-- <template #head>
                <p class="font-bold italic text-black/80">100 pictures uploaded for last 24 hours</p>
            </template> -->

            <Box>
                <Grid ref="list">
                    <PictureItem
                        v-for="(picture, i) in pictures"
                        :key="picture.id"
                        :picture="picture"
                        @click="index = i"
                        show-album
                    />
                </Grid>
            </Box>

            <Transition name="page">
                <PictureStory
                    v-if="picture"
                    key="iloveyou"
                    :picture="picture"
                    :show-prev="index > 0"
                    :show-next="index < pictures.length - 1"
                    @close="index = -1"
                    @prev="index--"
                    @next="index++"
                >
                    <PictureProgress :total="pictures.length" :current="index" />
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
                <AlbumItem v-for="(album, i) in albums" :key="album.id" :album="album" />
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
