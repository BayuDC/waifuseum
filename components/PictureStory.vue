<script lang="ts" setup>
const props = defineProps<{
    picture: Picture;
}>();
const emit = defineEmits<{
    (e: 'close'): void;
}>();

onMounted(() => {
    document.body.classList.add('overflow-hidden');
});
onUnmounted(() => {
    document.body.classList.remove('overflow-hidden');
});
</script>

<template>
    <div class="fixed inset-0 bg-black/60 backdrop-blur-md z-50">
        <Container class="h-full relative">
            <img :src="picture.urls.standard" class="object-contain w-full h-full" />
        </Container>
        <div class="bg-gradient-to-b from-black/40 to-black/0 absolute top-0 w-full pb-10">
            <Container class="h-full px-5 md:px-10 py-4">
                <Button icon="ic:round-close" class="ml-auto" @click="emit('close')">Close</Button>
            </Container>
        </div>
    </div>
</template>

<style scoped></style>
