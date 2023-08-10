<script lang="ts" setup>
const props = defineProps<{
    pictures: Picture[];
    picturesCount?: number;
}>();

const index = ref(-1);
const picture = computed<Picture | null>(() => {
    if (index.value < 0 || index.value >= props.pictures.length) return null;
    return props.pictures[index.value];
});

const picturesCount = props.picturesCount || props.pictures.length;
</script>

<template>
    <Box>
        <Grid>
            <template v-for="(picture, i) in pictures" :key="picture.id">
                <slot v-bind="{ picture }" @click="index = i" />
            </template>
        </Grid>
        <div v-if="!pictures.length" class="font-bold text-2xl text-center text-green">Still nothing here!</div>
    </Box>

    <Transition name="blur">
        <PictureStory
            v-if="picture"
            key="iloveyou"
            :picture="picture"
            :show-prev="index > 0"
            :show-next="index < pictures.length - 1"
            @close="index = -1"
            @prev="index--"
            @next="index++"
        >
            <PictureProgress :total="picturesCount" :current="index" />
        </PictureStory>
    </Transition>
</template>

<style scoped></style>
