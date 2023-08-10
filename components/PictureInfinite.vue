<script lang="ts" setup>
const props = defineProps<{
    source: string;
    picturesCount?: number;
}>();

const page = ref(1);
const ready = ref(false);

const { data, pending } = await useLiteFetch<{ pictures: Picture[] }>(props.source, {
    query: { count: 12, page },
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
    <Box>
        <Grid ref="list">
            <template v-for="(picture, i) in pictures" :key="picture.id">
                <slot :picture="picture" @click="index = i" />
            </template>
        </Grid>
        <div v-if="!pictures.length" class="font-bold text-2xl text-center text-green">Still nothing here!</div>
        <Loading v-if="ready && pending" class="mt-6 mb-4" />
    </Box>

    <Transition name="blur">
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
            <PictureProgress :total="picturesCount" :current="index" />
        </PictureStory>
    </Transition>
</template>

<style scoped></style>
