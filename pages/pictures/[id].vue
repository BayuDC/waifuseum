<script lang="tsx" setup>
const id = useRoute().params.id;

const { data: picture, error } = await useLiteFetch<Picture>(`/pictures/${id}`, {
    transform: (d: any) => d.picture,
});

if (!picture.value) throw showErrorSimplify(error);
</script>

<template>
    <Main v-if="picture">
        <Section>
            <div class="grid md:grid-cols-[320px_1fr] gap-4 items-start">
                <div class="md:sticky md:top-[144px]">
                    <Box>
                        <ul class="flex flex-col gap-4">
                            <InfoCell name="Id" :value="picture.id" />
                            <InfoCell
                                name="Album"
                                :value="picture.album!.name"
                                :url="`/albums/${picture.album!.slug}`"
                            />
                            <InfoCell
                                v-if="picture.source"
                                name="Source"
                                :value="picture.source"
                                :url="picture.source"
                            />
                            <InfoCell name="Download" :value="picture.url" :url="picture.url" />
                            <InfoCell name="Uploaded by" :value="picture.createdBy.name" />
                            <InfoCell
                                name="Uploaded at"
                                :value="usePrettyDate(picture.createdAt) + ' ' + usePrettyTime(picture.createdAt)"
                            />
                        </ul>
                    </Box>
                </div>
                <div>
                    <Box>
                        <div class="border-green border-[4px] rounded-lg overflow-hidden bg-green/20">
                            <img class="w-full" :src="picture.urls.standard" />
                        </div>
                    </Box>
                </div>
            </div>
        </Section>
    </Main>
</template>

<style scoped></style>
