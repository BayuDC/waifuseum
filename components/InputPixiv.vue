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

const emit = defineEmits<{
    (e: 'resolve', data: PixivData): void;
}>();

const id = ref('');
const url = computed(() => {
    return '/pictures/pixiv/' + id.value;
});

const { data, pending, error, execute } = await useLiteFetch<PixivData>(url, {
    immediate: false,
});
pending.value = false;

watch(data, () => {
    if (data.value) {
        emit('resolve', data.value);
    }
});
</script>

<template>
    <div class="relative">
        <InputText label="Pixiv Id" v-model:value="id" :error="id && error ? ' ' : null" @input.once="execute" />

        <span
            v-show="pending"
            class="absolute top-12 right-2 italic font-medium text-black px-2 rounded-md bg-green/100 cursor-pointer"
            >...</span
        >
    </div>
</template>

<style scoped></style>
