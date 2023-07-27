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
const picture = useState<Picture | null>('picture', () => null);

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

function setPicture(p: Picture) {
    picture.value = p;
}
function resetPicture() {
    picture.value = null;
}
</script>

<template>
    <Section v-if="data" :title="data.album.name" :subtitle="data.album.alias">
        <template #head>
            <div class="flex flex-wrap gap-2">
                <Badge v-for="tag in data.album.tags" :key="tag.id">#{{ tag.slug }}</Badge>
            </div>
        </template>
        <Box>
            <Grid ref="list">
                <PictureItem v-for="picture in pictures" :key="picture.id" :picture="picture" @click="setPicture" />
            </Grid>
            <div v-if="!pictures.length" class="font-bold text-2xl text-center text-green">Still nothing here!</div>
            <Loading v-if="ready && pending" class="mt-6 mb-4" />
        </Box>
        <Transition name="page">
            <PictureStory v-if="picture" :picture="picture" :key="picture.id" @close="resetPicture" />
        </Transition>
    </Section>
</template>

<style scoped></style>
