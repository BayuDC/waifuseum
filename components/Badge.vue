<script lang="ts" setup>
const props = defineProps<{
    clickable?: boolean;
}>();
</script>

<template>
    <div class="py-1 text-sm px-2 font-bold bg-green text-black rounded-lg" :class="{ 'hover:underline': clickable }">
        <slot />
    </div>
</template>

<style scoped></style>
