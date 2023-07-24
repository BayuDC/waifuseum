<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useLazyload } from 'vue3-lazyload';

const props = defineProps<{
    url: string;
}>();
const emit = defineEmits<{
    (e: 'loaded'): void;
}>();

const ready = ref(false);
const element = useLazyload(toRef(props, 'url'), {
    lifecycle: {
        loaded: () => {
            ready.value = true;
            emit('loaded');
        },
    },
    observerOptions: {
        rootMargin: '200px',
    },
});
</script>

<template>
    <div class="overflow-hidden rounded-md aspect-square bg-green/20">
        <div v-if="!ready" class="text-green h-full flex items-center justify-center">
            <Icon icon="line-md:loading-twotone-loop" :width="54" :height="54" />
        </div>
        <img
            class="w-full h-full object-cover object-top transition group-hover:scale-105"
            :class="[ready ? 'opacity-100' : 'opacity-0 blur']"
            ref="element"
        />
    </div>
</template>

<style scoped></style>
