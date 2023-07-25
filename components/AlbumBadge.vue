<script lang="ts" setup>
import { Icon } from '@iconify/vue';
const props = defineProps<{
    count: number;
}>();
</script>

<template>
    <div class="bg-green font-bold text-black p-2 flex rounded-lg items-center">
        <span class="px-1">
            {{ count }}
        </span>
        <Icon icon="ic:round-image" :width="20" :height="20" />
    </div>
</template>

<style scoped></style>
