<script lang="ts" setup>
const props = defineProps<{
    name: string;
    alias: string;
}>();
</script>

<template>
    <div class="text-center">
        <h3 class="font-bold italic text-xl text-black/90 group-hover:text-black/100 transition">
            {{ name }}
        </h3>
        <p v-if="alias" class="text-black/90 font-bold text-sm italic mt-0.5">{{ alias }}</p>
    </div>
</template>

<style scoped></style>
