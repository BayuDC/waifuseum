<script lang="ts" setup>
const id = useRoute().params.id;
const { data, error } = useMyFetch<{ album: Album; pictures: Picture[] }>(`/albums/${id}/pictures`, {
    query: { count: 12 },
});

if (error.value) throw showError({ statusCode: 404, statusMessage: 'Album Not Found' });
</script>

<template>
    <Section v-if="data" :title="data.album.name" :subtitle="data.album.alias">
        <template #head>
            <div class="flex flex-wrap gap-2">
                <AlbumTag v-for="tag in data.album.tags" :tag="tag" :key="tag.id" />
            </div>
        </template>
        <div class="block p-4 bg-[#FFFFFF] rounded-2xl border-black border-4 h-full shadow-[4px_4px_0px_0px_black]">
            <ul class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
                <li v-for="picture in data.pictures">
                    <PictureThumb :url="picture.urls.thumbnail" />
                </li>
            </ul>
        </div>
    </Section>
</template>

<style scoped></style>
