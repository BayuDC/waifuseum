<script lang="ts" setup>
defineProps<{
    albums: Album[];
}>();

const { control: pictureControl } = usePictureState();
function cancelUpload() {
    pictureControl.value.open = false;
}

watch(
    () => pictureControl.value.open,
    (v) => {
        v ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');
    },
);
</script>

<template>
    <template v-for="(album, i) in albums" :key="`${album.id}`">
        <slot :album="album" />
    </template>
    <div v-if="!albums.length" class="font-bold text-2xl text-center text-green">Still nothing here!</div>

    <template v-if="isAuth()">
        <Transition name="blur">
            <div v-if="pictureControl.open" class="fixed inset-0 bg-black/80 backdrop-blur z-50" @click="cancelUpload">
                <Container class="h-full relative flex items-center justify-center">
                    <Section>
                        <Box class="" @click.stop>
                            <PictureForm />
                        </Box>
                    </Section>
                </Container>
            </div>
        </Transition>
        <PixivImporter no-ui="" />
    </template>
</template>

<style scoped></style>
