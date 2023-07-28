<script setup lang="ts">
import { NuxtError } from 'nuxt/app';

const props = defineProps<{
    error: NuxtError;
}>();
</script>
<template>
    <NuxtLoadingIndicator :height="4" :color="false" class="bg-green" />
    <div class="bg-white min-h-screen flex flex-col text-center justify-center items-center">
        <h1 class="font-bold text-[10rem] leading-[12rem] md:text-[14rem] md:leading-[16rem]">
            {{ error.statusCode }}
        </h1>
        <p class="font-bold text-2xl md:text-4xl">{{ error.statusMessage }}</p>
        <Button class="mt-10" to="/" icon="ic:round-home" ignore-hide-text>Back to Home</Button>
    </div>
</template>
