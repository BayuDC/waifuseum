<script lang="ts" setup>
definePageMeta({
    middleware: ['auth-silent'],
});

const slug = useRoute().params.slug;

const { data: exists } = await useLiteFetch<Boolean>(`/tags/${slug}/exists`);
if (!exists.value) throw showError({ statusCode: 404, statusMessage: 'Tag not found!' });

const { data: tag } = await useLiteFetch<Tag>(`/tags/${slug}`, {
    transform: (d: any) => d.tag,
});
</script>

<template>
    <Main v-if="tag">
        <Section :title="tag.name" subtitle="Albums Tagged">
            <AlbumInfinite :source="`/albums?tag=${tag.slug}`" v-slot="props">
                <AlbumItem v-bind="props" :tag="'dummy'" />
            </AlbumInfinite>
        </Section>
    </Main>
</template>

<style scoped></style>
