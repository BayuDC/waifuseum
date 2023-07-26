<script lang="ts" setup>
const element = ref<HTMLElement | null>();
defineExpose({
    element,
});
</script>

<template>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4" ref="element">
        <slot />
    </ul>
</template>

<style scoped></style>
