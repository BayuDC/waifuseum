<script lang="ts" setup>
const slug = useRoute().params.slug;

const { data: album, error } = await useLiteFetch<Album>(`/albums/${slug}`, {
    transform: (d: any) => d.album,
});

if (error.value) throw showErrorSimplify(error);

const source = '/pictures?album=' + album.value!.slug;
</script>

<template>
    <Main>
        <Section v-if="album" :title="album.name" :subtitle="album.alias">
            <template #head>
                <div class="flex flex-wrap gap-2">
                    <NuxtLink v-for="tag in album.tags" :key="tag.id" :to="'/albums/@' + tag.slug">
                        <Badge clickable>#{{ tag.slug }}</Badge>
                    </NuxtLink>
                </div>
            </template>

            <PictureInfinite v-bind="{ source }" v-slot="props" :pictures-count="album.picturesCount">
                <PictureItem v-bind="props" show-date />
            </PictureInfinite>
        </Section>
    </Main>
</template>

<style scoped></style>
