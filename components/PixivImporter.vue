<script lang="ts" setup>
const props = defineProps<{
    noUi?: boolean;
}>();

interface PixivData {
    source: string;
    urls: {
        mini: string;
        thumb: string;
        small: string;
        regular: string;
        original: string;
    };
}

const { body: pictureBody } = usePictureState();

const url = computed(() => {
    return '/pictures/pixiv/' + pictureBody.value.pixivId;
});

const { data, pending, error } = await useLiteFetch<PixivData>(url, {
    immediate: false,
});
pending.value = false;

watch(data, () => {
    if (data.value) {
        pictureBody.value.source = data.value.source;
        pictureBody.value.fileUrl = data.value.urls.original;
    }
});

const state = computed(() => {
    if (pending.value) {
        return 'loading';
    } else if (error.value) {
        return 'error';
    } else if (data.value) {
        return 'success';
    } else {
        return 'default';
    }
});
</script>

<template>
    <template v-if="!noUi">
        <div class="flex justify-center items-center relative mt-2">
            <div class="relative bg-[#ffffff] z-10 p-2 font-bold text-black/60 text-sm">or import from Pixiv</div>
            <div class="absolute bg-black/40 w-full h-1"></div>
        </div>
        <div class="relative">
            <label for="pixiv" class="font-bold text-lg text-black/90 italic">Pixiv Id</label>
            <InputBase id="pixiv" v-model:value="pictureBody.pixivId" :state="state" />
        </div>
    </template>
</template>

<style scoped></style>
