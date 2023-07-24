<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const props = defineProps<{
    to: string;
    icon?: string;
}>();
</script>

<template>
    <NuxtLink
        :to="to"
        class="font-bold text-black bg-green py-2 px-2 rounded-md flex items-center hover:bg-green/90 transition"
    >
        <span class="px-1" :class="{ 'hidden sm:inline': icon }"><slot /></span>
        <Icon v-if="icon" :icon="icon" :width="24" :height="24" />
    </NuxtLink>
</template>

<style scoped></style>
