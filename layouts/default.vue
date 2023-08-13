<script lang="ts" setup></script>

<template>
    <div class="flex flex-col">
        <div class="min-h-screen">
            <Header class="sticky top-0 z-40" />
            <slot />
        </div>
        <Footer class="mt-auto" />
    </div>
</template>

<style></style>
