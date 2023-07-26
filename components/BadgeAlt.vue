<script lang="ts" setup>
import { Icon } from '@iconify/vue';
const props = defineProps<{
    icon: string;
    text: string | number;
}>();
</script>

<template>
    <div class="bg-green font-bold text-black p-2 flex rounded-lg items-center">
        <span class="px-1">
            {{ text }}
        </span>
        <Icon :icon="icon" :width="20" :height="20" />
    </div>
</template>

<style scoped></style>
