<script lang="ts" setup>
definePageMeta({
    middleware: ['auth-silent'],
});

const { data: tags } = await useLiteFetch<Tag[]>(`/tags/simple`, {
    transform: (d: any) => d.tags,
});
</script>

<template>
    <Main>
        <Section title="All Albums">
            <template #head>
                <ul class="flex flex-wrap gap-x-2">
                    <li v-for="tag in tags" class="font-medium hover:underline">
                        <NuxtLink :to="`/albums/~${tag.slug}`">#{{ tag.slug }}</NuxtLink>
                    </li>
                </ul>
            </template>

            <AlbumInfinite :source="`/albums`" v-slot="props">
                <AlbumItem v-bind="props" />
            </AlbumInfinite>
        </Section>
    </Main>
</template>

<style scoped></style>
