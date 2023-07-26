<script lang="ts" setup>
const target = ref<HTMLElement | null>(null);

useMotion(target, {
    initial: {
        opacity: 0,
        y: 100,
    },
    visibleOnce: {
        opacity: 100,
        y: 0,
        transition: {
            delay: Math.random() * 200,
        },
    },
});
</script>

<template>
    <li ref="target" class="opacity-0">
        <slot />
    </li>
</template>

<style scoped></style>
