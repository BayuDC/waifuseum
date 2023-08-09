<script lang="ts" setup>
const props = defineProps<{
    tag?: string;
}>();

const page = ref(1);

const albums = ref<Album[]>([]);
const { data, pending, error } = await useLiteFetch<{ tag?: Tag; albums: Album[] }>('/albums', {
    query: { page, count: 12, tag: props.tag },
});
const { data: tags } = await useLiteFetch('/tags', {
    query: { count: 5 },
    transform: (d: { tags: Tag[] }) => d.tags,
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

const title = data.value?.tag ? data.value.tag.name : 'All Albums';
const subtitle = data.value?.tag ? 'Albums Tagged' : undefined;
</script>

<template>
    <Main>
        <Section v-bind="{ title, subtitle }">
            <template #head v-if="!tag">
                <ul class="flex flex-wrap gap-x-2">
                    <li v-for="tag in tags" class="font-medium hover:underline">
                        <NuxtLink :to="`/albums/@${tag.slug}`">#{{ tag.slug }}</NuxtLink>
                    </li>
                </ul>
            </template>
            <Grid ref="list">
                <AlbumItem v-for="(album, i) in albums" :key="`${album.id}`" :album="album" :tag="data?.tag?.slug" />
            </Grid>
            <template #tail v-if="pending">
                <Loading />
            </template>
        </Section>
    </Main>
</template>

<style scoped></style>
