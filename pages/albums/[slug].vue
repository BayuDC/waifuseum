<script lang="ts" setup>
const slug = useRoute().params.slug;
const page = ref(1);
const ready = ref(false);

const { data: album } = await useLiteFetch<Album>(`/albums/${slug}`, {
    transform: (data: any) => data.album,
});

if (!album.value) throw showError({ statusCode: 404, statusMessage: 'Album Not Found' });

const { data, pending } = await useLiteFetch<{ pictures: Picture[] }>(`/pictures`, {
    query: { count: 12, page, album: slug },
});

const list = ref<{ element: HTMLElement } | null>(null);

const index = ref(-1);

const pictures = ref<Picture[]>([]);
const picture = computed<Picture | null>(() => {
    if (index.value < 0 || index.value >= pictures.value.length) return null;
    return pictures.value[index.value];
});

watchOnce(data, () => {
    ready.value = true;
});

watchImmediate(data, () => {
    if (!data.value) return;
    pictures.value = [...pictures.value, ...data.value!.pictures];
});

watch(pictures, () => {
    nextTick(() => {
        setup(list.value!.element);
    });
});

const {
    pause,
    resume,
    stop: unwatch,
} = watchPausable(index, () => {
    if (pictures.value.length - index.value < 5) {
        page.value++;
    }
});

watch(pending, () => {
    pending.value ? pause() : resume();
});

const { setup, stop } = useInfinite(() => {
    page.value++;
});

until(data)
    .toMatch((v) => !v?.pictures.length)
    .then(() => {
        unwatch();
        stop();
    });

onMounted(() => {
    setup(list.value!.element);
});
onUnmounted(stop);
</script>

<template>
    <Main>
        <Section v-if="album" :title="album.name" :subtitle="album.alias">
            <template #head>
                <div class="flex flex-wrap gap-2">
                    <NuxtLink v-for="tag in album.tags" :key="tag.id" :to="'/albums?tag=' + tag.slug">
                        <Badge clickable>#{{ tag.slug }}</Badge>
                    </NuxtLink>
                </div>
            </template>
            <Box>
                <Grid ref="list">
                    <PictureItem
                        v-for="(picture, i) in pictures"
                        :key="picture.id"
                        :picture="picture"
                        @click="index = i"
                        show-date
                    />
                </Grid>
                <div v-if="!pictures.length" class="font-bold text-2xl text-center text-green">Still nothing here!</div>
                <Loading v-if="ready && pending" class="mt-6 mb-4" />
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
                    <PictureProgress :total="album.picturesCount" :current="index" />
                </PictureStory>
            </Transition>
        </Section>
    </Main>
</template>

<style scoped></style>
