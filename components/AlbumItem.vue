<script lang="ts" setup>
const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps<{
    album: Album;
    tag?: string;
}>();

const target = ref<HTMLElement | null>(null);

usePopMotion(target, { opacity: 0, scale: 0 }, { opacity: 100, scale: 1, transition: { delay: useRandom(300) } });

const thumb = ref(pickRandom(props.album.pictures)?.urls.thumbnail);
const tag = props.tag || props.album.tags[0]?.slug;

const { body: pictureBody, control: pictureControl } = usePictureState();

function onDrop() {
    pictureBody.value.album = props.album.slug;
    pictureControl.value.open = true;
    pictureControl.value.callback = (p) => {
        pictureControl.value.open = false;
        props.album.picturesCount++;
        thumb.value = p.urls.thumbnail;
    };
}
</script>

<template>
    <li ref="target" class="opacity-0">
        <PictureDrop v-slot="{ isOver }" @drop="onDrop">
            <Box
                :is="NuxtLink"
                :to="`/albums/${album.slug}`"
                class="hover:bg-green/10 transition group overflow-hidden relative"
            >
                <AlbumCover :url="thumb" :tag="tag" :count="album.picturesCount" />
                <AlbumInfo v-bind="{ name: album.name, alias: album.alias }" class="mt-2" />
                <Transition name="blur">
                    <BoxOverlay v-if="isOver" class="bg-green/40"> Drop to upload! </BoxOverlay>
                </Transition>
            </Box>
        </PictureDrop>
    </li>
</template>

<style scoped></style>
