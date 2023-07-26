<script lang="ts" setup>
const page = ref(1);
const albums = ref<Album[]>([]);
const { data } = await useMyFetch<{ albums: Album[] }>('/albums', {
    query: { page, count: 12 },
});

const list = ref<HTMLElement | null>(null);
const target = ref<HTMLElement | null>(null);

watchImmediate(data, () => {
    if (!data.value) return;
    albums.value = [...albums.value, ...data.value!.albums];
});

watch(albums, () => {
    nextTick(updateTarget);
});

function updateTarget() {
    target.value = list.value!.lastElementChild as HTMLElement;
}

const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
        if (isIntersecting) page.value++;
    },
    { rootMargin: '400px' },
);

until(data)
    .toMatch((v) => !v?.albums.length)
    .then(stop);

onMounted(updateTarget);
onUnmounted(stop);
</script>

<template>
    <Section title="All Albums">
        <ul class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4" ref="list">
            <AlbumItem v-for="(album, i) in albums" :key="album.id">
                <AlbumCard :album="album" />
            </AlbumItem>
        </ul>
    </Section>
</template>

<style scoped></style>
