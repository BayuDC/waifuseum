<script lang="ts" setup>
const props = defineProps<{
    picture: Picture;
}>();
const emit = defineEmits<{
    (e: 'click', picture: Picture): void;
}>();

const target = ref<HTMLElement | null>(null);

usePopMotion(target, { opacity: 0, y: 100 }, { opacity: 100, y: 0 });

const date = usePrettyDate(props.picture.createdAt);
</script>

<template>
    <li ref="target" class="opacity-0 cursor-pointer" tabindex="0" @click="emit('click', picture)">
        <PictureCover :url="picture.urls.thumbnail" :date="date" />
    </li>
</template>

<style scoped></style>
