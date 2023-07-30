<script lang="ts" setup>
const id = useRoute().params.id;
const page = ref(1);
const ready = ref(false);
const { data, error, pending } = await useLiteFetch<{ album: Album; pictures: Picture[] }>(`/albums/${id}/pictures`, {
    query: { count: 12, page },
});

if (error.value) throw showError({ statusCode: 404, statusMessage: 'Album Not Found' });

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
        <Section v-if="data" :title="data.album.name" :subtitle="data.album.alias">
            <template #head>
                <div class="flex flex-wrap gap-2">
                    <Badge v-for="tag in data.album.tags" :key="tag.id">#{{ tag.slug }}</Badge>
                </div>
            </template>
            <Box>
                <Grid ref="list">
                    <PictureItem
                        v-for="(picture, i) in pictures"
                        :key="picture.id"
                        :picture="picture"
                        @click="index = i"
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
                    <PictureProgress :total="data.album.picturesCount" :current="index" />
                </PictureStory>
            </Transition>
        </Section>
    </Main>
</template>

<style scoped></style>
