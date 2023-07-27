<script lang="ts" setup>
const props = defineProps<{
    url: string | undefined;
    tag: string | undefined;
    count: number;
}>();
</script>

<template>
    <div class="relative">
        <PictureThumb :url="url" />
        <Badge
            v-if="tag"
            class="absolute origin-top-left -rotate-90 -left-0.5 -bottom-0.5 group-hover:-translate-x-0.5 group-hover:-bottom-1 translate-y-full transition-[transform,bottom]"
            >#{{ tag }}</Badge
        >
        <BadgeAlt
            :text="count"
            icon="ic:round-image"
            class="absolute -top-0.5 -right-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
        />
    </div>
</template>

<style scoped></style>
