<script lang="ts" setup>
const props = defineProps<{
    source: string;
}>();

const page = ref(1);

const albums = ref<Album[]>([]);
const { data, pending, error } = await useLiteFetch<{ albums: Album[] }>(props.source, {
    query: { page, count: 12 },
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
</script>

<template>
    <Grid ref="list">
        <AlbumList :albums="albums" v-slot="props">
            <slot v-bind="props" />
        </AlbumList>
    </Grid>
    <div v-if="!albums.length" class="font-bold text-2xl text-center text-green">Still nothing here!</div>
    <Loading v-if="pending" class="mt-8" />
</template>

<style scoped></style>
