<script lang="tsx" setup>
definePageMeta({
    middleware: ['auth-silent'],
});

const user = useAuth();
const id = useRoute().params.id;

const { data: picture, error } = await useLiteFetch<Picture>(`/pictures/${id}`, {
    transform: (d: any) => d.picture,
});

if (!picture.value) throw showErrorSimplify(error);

const showTools = ref(true);

const deleteMode = ref(false);
const deleteMessage = ref('');
const deleteFetch = useMainFetch(`/pictures/${id}`, {
    key: 'picture-delete',
    method: 'delete',
    immediate: false,
});
async function onDelete() {
    showTools.value = false;
    deleteMessage.value = 'Deleting...';

    await deleteFetch.execute();
    if (deleteFetch.error.value) {
        deleteMessage.value = 'Delete Failed';
        setTimeout(() => {
            deleteMessage.value = '';
            deleteMode.value = false;
            showTools.value = true;
        }, 3000);
    } else {
        deleteMessage.value = 'Deleted';
    }
}

const updateMode = ref(false);
function onUpdate() {}
</script>

<template>
    <Main v-if="picture">
        <Section>
            <div class="grid md:grid-cols-[320px_1fr] gap-4 items-start">
                <div class="md:sticky md:top-[144px] order-1 md:order-none flex flex-col gap-4">
                    <Box class="relative overflow-hidden">
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
                        <Transition name="blur">
                            <BoxOverlay v-if="deleteMessage" :class="{ 'bg-pink/60': deleteMode }">
                                {{ deleteMessage }}
                            </BoxOverlay>
                        </Transition>
                    </Box>

                    <Transition name="slide">
                        <div
                            class="flex flex-col items-end gap-4"
                            v-if="user && showTools && user.id == picture.createdBy.id"
                        >
                            <Transition name="blur" mode="out-in">
                                <Box v-if="updateMode" class="w-full">
                                    <InputText label="Source" button="Save" />
                                </Box>
                                <Button v-else @click="updateMode = true" icon="ic:round-edit">Update Source</Button>
                            </Transition>
                            <Transition name="blur" mode="out-in">
                                <Button v-if="deleteMode" @click="onDelete" icon="ic:round-delete-forever" danger
                                    >Are you sure?</Button
                                >
                                <Button v-else @click="deleteMode = true" icon="ic:round-delete" danger
                                    >Delete This</Button
                                >
                            </Transition>
                        </div>
                    </Transition>
                </div>
                <div>
                    <Box class="">
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
