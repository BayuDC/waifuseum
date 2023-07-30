<script lang="ts" setup>
const page = ref(1);
const albums = ref<Album[]>([]);
const { data, pending } = await useLiteFetch<{ albums: Album[] }>('/albums', {
    query: { page, count: 12 },
});

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
</script>

<template>
    <Main>
        <Section title="All Albums">
            <Grid ref="list">
                <AlbumItem v-for="(album, i) in albums" :key="album.id" :album="album" />
            </Grid>
            <template #tail v-if="pending">
                <Loading />
            </template>
        </Section>
    </Main>
</template>

<style scoped></style>
