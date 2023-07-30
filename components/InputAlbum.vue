<script lang="ts" setup>
const props = defineProps<{
    album: string;
    error?: string;
}>();

const emit = defineEmits<{
    (e: 'update:album', album: string): void;
}>();

const album = computed({
    get: () => props.album,
    set: (album) => emit('update:album', album),
});
const suggestion = ref<string | null>(null);

const { data, pending } = useLiteFetch<{ albums: Album[] }>('/albums?simple=true', {
    query: { search: album },
    immediate: false,
});
pending.value = false;

watch(data, () => {
    if (data.value?.albums.length == 1) {
        suggestion.value = data.value.albums[0].slug;
        return;
    }

    suggestion.value = '';
});

function pickSuggestion() {
    if (suggestion.value) {
        album.value = suggestion.value;
    }
}
</script>

<template>
    <div class="relative">
        <InputText
            v-bind="{ label: 'Album', required: true, error }"
            v-model:value="album"
            @keydown.tab="pickSuggestion"
        />
        <span
            v-show="pending || (suggestion && suggestion != album)"
            class="absolute top-12 right-2 italic font-medium text-black px-2 rounded-md bg-green/100 cursor-pointer transition"
            @click="pickSuggestion"
            >{{ pending ? '...' : suggestion }}</span
        >
    </div>
</template>

<style scoped></style>
