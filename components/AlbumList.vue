<script lang="ts" setup>
defineProps<{
    albums: Album[];
}>();
const route = useRoute();
const { control: pictureControl } = usePictureState();
const countdown = ref(5);
const timer = ref<NodeJS.Timer | null>(null);

watch(
    () => pictureControl.value.open,
    () => {
        if (pictureControl.value.open) {
            document.body.classList.add('overflow-hidden');

            if (!isAuth()) {
                countdown.value = 5;
                timer.value = setInterval(() => {
                    countdown.value--;

                    if (countdown.value <= 0) {
                        stopTimer();
                        navigateTo('/login?redirect=' + route.fullPath);
                    }
                }, 1000);
            }
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    },
);

function cancelUpload() {
    pictureControl.value.open = false;
    if (timer.value) stopTimer();
}
function stopTimer() {
    clearInterval(timer.value!);
    timer.value = null;
}
</script>

<template>
    <template v-for="(album, i) in albums" :key="`${album.id}`">
        <slot :album="album" />
    </template>
    <div v-if="!albums.length" class="font-bold text-2xl text-center text-green">Still nothing here!</div>

    <Transition name="blur">
        <div v-if="pictureControl.open" class="fixed inset-0 bg-black/80 backdrop-blur z-50" @click="cancelUpload">
            <Container class="h-full relative flex items-center justify-center">
                <Section>
                    <Box v-if="isAuth()" class @click.stop>
                        <PictureForm />
                    </Box>
                    <div v-else class="flex flex-col italic text-center text-white">
                        <div class="text-3xl font-bold">Please login to use this feature!</div>
                        <p class="mt-6 text-lg">Redirecting to login page in {{ countdown }}</p>
                        <p class="mt-1">Click anywhere to cancel it</p>
                    </div>
                </Section>
            </Container>
        </div>
    </Transition>
    <PixivImporter no-ui />
</template>

<style scoped></style>
