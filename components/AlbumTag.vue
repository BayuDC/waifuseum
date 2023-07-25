<script lang="ts" setup>
const props = defineProps<{
    tag: Tag;
}>();
</script>

<template>
    <div class="py-1 text-sm px-2 font-bold bg-green text-black rounded-lg">#{{ tag.slug }}</div>
</template>

<style scoped></style>
