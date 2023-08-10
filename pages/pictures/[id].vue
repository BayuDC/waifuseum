<script lang="tsx" setup>
definePageMeta({
    middleware: ['auth-silent'],
});

const user = useAuth();
const id = useRoute().params.id;
// const mode = ref<'idle' | 'update' | 'delete'>('idle');
const updateMode = ref(false);
const deleteMode = ref(false);

const { data: picture, error } = await useLiteFetch<Picture>(`/pictures/${id}`, {
    transform: (d: any) => d.picture,
});

if (!picture.value) throw showErrorSimplify(error);
</script>

<template>
    <Main v-if="picture">
        <Section>
            <div class="grid md:grid-cols-[320px_1fr] gap-4 items-start">
                <div class="md:sticky md:top-[144px] order-1 md:order-none flex flex-col gap-4">
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

                    <template v-if="user && user.id == picture.createdBy.id">
                        <Transition name="blur" mode="out-in">
                            <Box v-if="updateMode">
                                <InputText label="Source" button="Save" />
                            </Box>
                            <div v-else class="flex justify-end">
                                <Button @click="updateMode = true" icon="ic:round-edit"> Update Source </Button>
                            </div>
                        </Transition>
                        <div class="flex justify-end">
                            <Transition name="blur" mode="out-in">
                                <Button v-if="!deleteMode" @click="deleteMode = true" icon="ic:round-delete" danger
                                    >Delete This</Button
                                >
                                <Button v-else @click="" icon="ic:round-delete-forever" danger>Are you sure?</Button>
                            </Transition>
                        </div>
                    </template>
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
