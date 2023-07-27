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
        loading: () => console.log('start'),
        loaded: () => (ready.value = true),
    },
});

onMounted(() => {
    document.body.classList.add('overflow-hidden');
    console.log(isMobile().any);
});
onUnmounted(() => {
    document.body.classList.remove('overflow-hidden');
});
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
        <div class="bg-gradient-to-b from-black/40 to-black/0 absolute top-0 w-full pb-10">
            <Container class="h-full px-5 md:px-10 py-4">
                <Button icon="ic:round-close" class="ml-auto" @click="emit('close')">Close</Button>
            </Container>
        </div>
    </div>
</template>

<style scoped></style>
