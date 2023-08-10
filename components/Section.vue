<script lang="ts" setup>
const props = defineProps<{
    title?: string;
    subtitle?: string;
    centerHead?: boolean;
    noPadding?: boolean;
}>();

const slots = useSlots();
</script>

<template>
    <div class="">
        <Container :class="[noPadding ? '' : 'px-5 md:px-10']">
            <Transition name="slide" mode="out-in">
                <div v-if="title" :key="title" class="md:mb-8 mb-4" :class="{ 'text-center': centerHead }">
                    <p v-if="subtitle" class="text-xl md:text-2xl font-bold italic text-black/90">{{ subtitle }}</p>
                    <h1 class="text-5xl md:text-6xl font-bold italic text-black/90">{{ title }}</h1>

                    <div v-if="slots.head" class="mt-2">
                        <slot name="head" />
                    </div>
                </div>
            </Transition>
            <div>
                <slot />
            </div>
            <div v-if="slots.tail" class="mt-8">
                <slot name="tail" />
            </div>
        </Container>
    </div>
</template>

<style scoped></style>
