<script lang="ts" setup>
const { data: picturesCount } = await useLiteFetch<number>(`/pictures/today`, {
    transform: (d: any) => d.picturesCount,
    query: { count: 1 },
});
</script>

<template>
    <Main>
        <Section title="Today Upload">
            <template #head>
                <p class="font-bold italic text-black/60 text-lg">
                    <span class="text-black/100">{{ picturesCount }}</span>
                    pictures uploaded over the last 24 hours
                </p>
            </template>
            <PictureInfinite source="/pictures/today" v-slot="props" :pictures-count="picturesCount">
                <PictureItem v-bind="props" show-album />
            </PictureInfinite>
        </Section>
    </Main>
</template>

<style scoped></style>
