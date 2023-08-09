<script lang="ts" setup>
definePageMeta({
    keepalive: true,
});

const route = useRoute();

const page = ref(1);
const albums = ref<Album[]>([]);
const { data, pending, error } = await useLiteFetch<{ tag?: Tag; albums: Album[] }>('/albums', {
    query: { page, count: 12, tag: route.query.tag },
});

if (error.value) throw showErrorSimplify(error);

const list = ref<{ element: HTMLElement } | null>(null);

watchImmediate(data, () => {
    if (!data.value) return;
    albums.value = [...albums.value, ...data.value!.albums];
});

watch(albums, () => {
    nextTick(() => {
        setup(list.value!.element);
    });
});

const { setup, stop } = useInfinite(() => {
    page.value++;
});

until(data)
    .toMatch((v) => !v?.albums.length)
    .then(stop);

onMounted(() => {
    setup(list.value!.element);
});
onUnmounted(stop);

const title = computed(() => {
    if (data.value?.tag) return data.value.tag.name;

    return 'All Albums';
});
const subtitle = computed(() => {
    if (data.value?.tag) return 'Albums Tagged';

    return;
});
</script>

<template>
    <Main>
        <Section v-bind="{ title, subtitle }">
            <Grid ref="list">
                <AlbumItem v-for="(album, i) in albums" :key="album.id" :album="album" :tag="data?.tag?.slug" />
            </Grid>
            <template #tail v-if="pending">
                <Loading />
            </template>
        </Section>
    </Main>
</template>

<style scoped></style>
