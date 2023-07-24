<script lang="ts" setup>
const props = defineProps<{
    urls: string[];
}>();
</script>

<template>
    <div class="overflow-hidden rounded-md aspect-square">
        <img :src="urls[0]" class="w-full h-full object-cover object-top" />
    </div>
</template>

<style scoped></style>
