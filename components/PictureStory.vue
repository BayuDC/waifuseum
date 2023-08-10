<script lang="tsx" setup>
import { Icon } from '@iconify/vue';
import { useLazyload } from 'vue3-lazyload';

const props = defineProps<{
    picture: Picture;
    showPrev: boolean;
    showNext: boolean;
}>();
const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'next'): void;
    (e: 'prev'): void;
}>();

const ready = ref(false);
const source = computed(() => {
    return props.picture.urls.standard;
});

watch(source, () => {
    ready.value = false;
});

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

const date = computed(() => {
    const date = props.picture.createdAt;
    return `${usePrettyDate(date)} ${usePrettyTime(date)}`;
});

const NavButton = defineComponent(
    (props) => {
        return () => (
            <button class="p-2 w-[50%] md:w-auto md:hover:bg-gray/40 rounded-lg transition">
                <Icon icon={props.icon} class="hidden md:inline" width={72} height={72} />
            </button>
        );
    },
    { props: ['icon'] },
);
</script>

<template>
    <div class="fixed inset-0 bg-black/80 backdrop-blur z-50">
        <Container class="h-full relative">
            <img
                ref="element"
                class="object-contain w-full h-full transition"
                :class="[ready ? 'opacity-100' : 'opacity-0 blur']"
            />
            <div v-if="!ready" class="flex justify-center items-center absolute inset-0 text-white">
                <Icon icon="line-md:loading-twotone-loop" :width="72" :height="72" />
            </div>
        </Container>
        <div class="absolute inset-0 md:px-5 flex">
            <div class="md:my-auto flex justify-between w-full text-white">
                <NavButton v-show="showPrev" icon="ic:round-navigate-before" class="mr-auto" @click="emit('prev')" />
                <NavButton v-show="showNext" icon="ic:round-navigate-next" class="ml-auto" @click="emit('next')" />
            </div>
        </div>
        <div class="bg-gradient-to-b from-black/60 to-black/0 absolute top-0 w-full pb-16">
            <Container class="h-full p-5 md:px-10 md:py-5">
                <Button icon="ic:round-cancel" class="ml-auto hidden md:flex" @click="emit('close')">Close</Button>
            </Container>
        </div>
        <div class="bg-gradient-to-t from-black/60 to-black/0 absolute bottom-0 w-full pt-16">
            <Container class="h-full p-5 md:px-10 md:py-5 flex items-center gap-2">
                <p class="text-white font-medium mr-auto hidden md:inline">Uploaded at {{ date }}</p>
                <Button icon="ic:round-info" :to="`/pictures/${picture.id}`" target="”_blank”">Detail</Button>
                <Button icon="ic:round-file-open" v-if="picture.source" :to="picture.source" target="”_blank”"
                    >Source</Button
                >
                <Button icon="ic:round-download" :to="picture.url" download target="_blank">Download</Button>
                <Button icon="ic:round-cancel" class="ml-auto md:hidden" @click="emit('close')">Close</Button>
            </Container>
        </div>
        <slot />
    </div>
</template>

<style scoped></style>
