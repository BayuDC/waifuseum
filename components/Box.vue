<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        is?: any;
    }>(),
    {
        is: 'div',
    },
);
</script>

<template>
    <component
        :is="is"
        class="block p-4 bg-[#FFFFFF] rounded-2xl border-black border-4 h-full shadow-[4px_4px_0px_0px_black]"
    >
        <slot />
    </component>
</template>

<style scoped></style>
