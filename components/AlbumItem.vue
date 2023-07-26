<script lang="ts" setup>
const target = ref<HTMLElement | null>(null);

const { apply } = useMotion(target, {
    initial: {
        opacity: 0,
        scale: 0,
    },
});
useAppear(target, () => {
    const delay = Math.random() * 300;
    apply({
        opacity: 100,
        scale: 1,
        transition: { delay },
    });
});
</script>

<template>
    <li ref="target" class="opacity-0">
        <slot />
    </li>
</template>

<style scoped></style>
