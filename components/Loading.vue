<script lang="ts" setup>
const dots = ref('');

const timerId = setInterval(() => {
    if (dots.value.length >= 3) {
        return (dots.value = '');
    }
    dots.value += '.';
}, 300);

onUnmounted(() => {
    clearInterval(timerId);
});
</script>

<template>
    <div class="font-bold text-xl text-center text-green">Loading{{ dots }}</div>
</template>

<style scoped></style>
