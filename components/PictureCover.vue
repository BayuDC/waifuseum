<script lang="ts" setup>
const props = defineProps<{
    url: string;
    badge1?: string;
    badge2?: string;
}>();
</script>

<template>
    <div class="relative group">
        <PictureThumb :url="url" />
        <Badge
            v-if="badge1"
            class="absolute -top-0.5 -left-0.5 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition"
        >
            {{ badge1 }}
        </Badge>
        <Badge
            v-if="badge2"
            class="absolute -bottom-0.5 -right-0.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition"
        >
            {{ badge2 }}
        </Badge>
    </div>
</template>

<style scoped></style>
