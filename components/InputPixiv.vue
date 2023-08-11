<script lang="ts" setup>
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
const props = defineProps<{
    id: string;
}>();
const emit = defineEmits<{
    (e: 'update:id', id: string): void;
    (e: 'resolve', data: PixivData): void;
}>();

const url = computed(() => {
    return '/pictures/pixiv/' + props.id;
});

const { data, pending, error } = await useLiteFetch<PixivData>(url, {
    immediate: false,
});
pending.value = false;

watch(data, () => {
    if (data.value) {
        emit('resolve', data.value);
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
    <div class="relative">
        <label for="pixiv" class="font-bold text-lg text-black/90 italic">Pixiv Id</label>
        <InputBase id="pixiv" :value="id" @update:value="(v: string) => emit('update:id', v)" :state="state" />
    </div>
</template>

<style scoped></style>
