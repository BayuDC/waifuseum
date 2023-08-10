<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const props = defineProps<{
    to?: string;
    icon?: string;
    ignoreHideText?: boolean;
    danger?: boolean;
}>();

const NuxtLink = resolveComponent('NuxtLink');
const component = props.to ? NuxtLink : 'button';

const classes = props.danger ? 'bg-pink/90 hover:bg-pink/80' : 'bg-green hover:bg-green/90';
</script>

<template>
    <component
        :to="to"
        :is="component"
        class="font-bold text-black py-2 px-2 rounded-md flex items-center transition"
        :class="[classes]"
    >
        <span class="px-1" :class="{ 'hidden sm:inline': !ignoreHideText }"><slot /></span>
        <Icon v-if="icon" :icon="icon" :width="24" :height="24" />
    </component>
</template>

<style scoped></style>
