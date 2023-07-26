<script lang="ts" setup>
const id = useRoute().params.id;
const page = ref(1);
const ready = ref(false);
const { data, error, pending } = await useMyFetch<{ album: Album; pictures: Picture[] }>(`/albums/${id}/pictures`, {
    query: { count: 12, page },
});

if (error.value) throw showError({ statusCode: 404, statusMessage: 'Album Not Found' });

const list = ref<HTMLElement | null>(null);
const target = ref<HTMLElement | null>(null);

const pictures = ref<Picture[]>([]);

watchOnce(data, () => {
    ready.value = true;
});

watchImmediate(data, () => {
    if (!data.value) return;
    pictures.value = [...pictures.value, ...data.value!.pictures];
});

watch(pictures, () => {
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
    .toMatch((v) => !v?.pictures.length)
    .then(stop);

onMounted(() => {
    updateTarget();
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
        <div class="block p-4 bg-[#FFFFFF] rounded-2xl border-black border-4 h-full shadow-[4px_4px_0px_0px_black]">
            <ul class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4" ref="list">
                <li v-for="picture in pictures" :key="picture.id">
                    <PictureThumb :url="picture.urls.thumbnail" />
                </li>
            </ul>
            <Loading v-if="ready && pending" class="mt-6 mb-4" />
        </div>
    </Section>
</template>

<style scoped></style>
