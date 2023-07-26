<script lang="ts" setup>
const id = useRoute().params.id;
const page = ref(1);
const ready = ref(false);
const { data, error, pending } = await useMyFetch<{ album: Album; pictures: Picture[] }>(`/albums/${id}/pictures`, {
    query: { count: 12, page },
});

if (error.value) throw showError({ statusCode: 404, statusMessage: 'Album Not Found' });

const list = ref<{ element: HTMLElement } | null>(null);

const pictures = ref<Picture[]>([]);

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

const { setup, stop } = useInfinite(() => {
    page.value++;
});

until(data)
    .toMatch((v) => !v?.pictures.length)
    .then(stop);

onMounted(() => {
    setup(list.value!.element);
});
onUnmounted(stop);
</script>

<template>
    <Section v-if="data" :title="data.album.name" :subtitle="data.album.alias">
        <template #head>
            <div class="flex flex-wrap gap-2">
                <AlbumTag v-for="tag in data.album.tags" :tag="tag" :key="tag.id" />
            </div>
        </template>
        <Box>
            <Grid ref="list">
                <li v-for="picture in pictures" :key="picture.id">
                    <PictureThumb :url="picture.urls.thumbnail" />
                </li>
            </Grid>
            <Loading v-if="ready && pending" class="mt-6 mb-4" />
        </Box>
    </Section>
</template>

<style scoped></style>
