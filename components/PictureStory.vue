<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useLazyload } from 'vue3-lazyload';

const props = defineProps<{
    picture: Picture;
}>();
const emit = defineEmits<{
    (e: 'close'): void;
}>();

const ready = ref(false);
const source = toRef(props.picture.urls, 'standard');

const element = useLazyload(source, {
    lifecycle: {
        loaded: () => (ready.value = true),
    },
});

onMounted(() => {
    document.body.classList.add('overflow-hidden');
});
onUnmounted(() => {
    document.body.classList.remove('overflow-hidden');
});

const date = usePrettyDate(props.picture.createdAt);
</script>

<template>
    <div class="fixed inset-0 bg-black/80 backdrop-blur z-50">
        <Container class="h-full relative">
            <img
                class="object-contain w-full h-full transition"
                :class="[ready ? 'opacity-100' : 'opacity-0 blur']"
                ref="element"
            />
            <div v-if="!ready" class="flex justify-center items-center absolute inset-0 text-green">
                <Icon icon="line-md:loading-twotone-loop" :width="72" :height="72" />
            </div>
        </Container>
        <div class="bg-gradient-to-b from-black/60 to-black/0 absolute top-0 w-full pb-16">
            <Container class="h-full p-5 md:px-10 md:py-5">
                <Button icon="ic:close" class="ml-auto hidden md:flex" @click="emit('close')">Close</Button>
            </Container>
        </div>
        <div class="bg-gradient-to-t from-black/60 to-black/0 absolute bottom-0 w-full pt-16">
            <Container class="h-full p-5 md:px-10 md:py-5 flex items-center gap-2">
                <p class="text-white font-medium mr-auto hidden md:inline">Uploaded at {{ date }}</p>
                <Button icon="ic:round-open-in-new" :to="picture.source" target="”_blank”">Source</Button>
                <Button icon="ic:round-download" :to="picture.url" download target="_blank">Download</Button>
                <Button icon="ic:close" class="ml-auto md:hidden" @click="emit('close')">Close</Button>
            </Container>
        </div>
    </div>
</template>

<style scoped></style>
