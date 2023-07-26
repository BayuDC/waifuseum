<script lang="ts" setup>
const props = defineProps<{
    url: string;
    date: string;
}>();
</script>

<template>
    <div class="relative group">
        <PictureThumb :url="url" />
        <Badge
            class="absolute -bottom-0.5 -right-0.5 opacity-100 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:opacity-100 transition"
        >
            {{ date }}
        </Badge>
    </div>
</template>

<style scoped></style>
