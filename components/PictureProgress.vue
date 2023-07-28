<script lang="ts" setup>
const props = defineProps<{
    total: number;
    current: number;
}>();

const size = 20;
const count = Math.ceil(props.total / size);

const position = computed(() => {
    return Math.ceil((props.current + 1) / size);
});

const progress = computed(() => {
    const max = position.value == count ? props.total % size : size;
    return (((props.current % size) + 1) / max) * 100;
});
</script>

<template>
    <div class="absolute top-0 w-full text-black flex gap-1 md:gap-2 px-1 md:px-2">
        <div
            v-for="i in count"
            class="h-1 rounded transition-[width] duration-1000"
            :class="{
                'bg-white md:w-4 w-2': i < position,
                'bg-white/20 w-full': i === position,
                'bg-white/20 md:w-4 w-2': i > position,
            }"
        >
            <div
                v-if="i === position"
                class="bg-white h-1 rounded transition-[width]"
                :style="{ width: `${progress}%` }"
            ></div>
        </div>
    </div>
</template>
