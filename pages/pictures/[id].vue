<script lang="ts" setup>
definePageMeta({
    middleware: ['auth-silent'],
});

const user = useAuth();
const id = useRoute().params.id;

const { data: picture, error } = await useLiteFetch<Picture>(`/pictures/${id}`, {
    transform: (d: any) => d.picture,
});

if (!picture.value) throw showErrorSimplify(error);

// TODO move in future

const showTools = ref(true);
const mode = ref<'delete' | 'update' | 'idle'>('idle');

const deleteConfirm = ref(false);
const deleteMessage = ref('');
const deleteFetch = useMainFetch(`/pictures/${id}`, {
    key: 'picture-delete',
    method: 'delete',
    immediate: false,
});
async function onDeleteConfirm() {
    showTools.value = false;
    deleteMessage.value = 'Deleting...';
    mode.value = 'delete';

    await deleteFetch.execute();
    if (deleteFetch.error.value) {
        deleteMessage.value = 'Delete Failed';
        setTimeout(() => {
            deleteMessage.value = '';
            deleteConfirm.value = false;
            showTools.value = true;
            mode.value = 'idle';
        }, 3000);
    } else {
        deleteMessage.value = 'Deleted';
    }
}
function onDelete() {
    deleteConfirm.value = true;
    setTimeout(() => {
        deleteConfirm.value = false;
    }, 6000);
}

const updateBody = reactive({ source: '' });
const updateMessage = ref('');
const updateOpen = ref(false);
const updateLoading = ref(false);
const updateFetch = useMainFetch(`/pictures/${id}`, {
    key: 'picture-update',
    method: 'put',
    immediate: false,
    body: updateBody,
    watch: false,
});

async function onUpdate() {
    if (updateLoading.value) return;

    updateLoading.value = true;
    await updateFetch.execute();
    updateLoading.value = false;

    if (updateFetch.error.value) {
        updateMessage.value = updateFetch.error.value.data.details.source;
    } else {
        picture.value!.source = updateBody.source;
        updateBody.source = '';
        updateOpen.value = false;
    }
}
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
                            <BoxOverlay v-if="deleteMessage" class="bg-pink/40">
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
                                <Box v-if="updateOpen" class="w-full">
                                    <InputText
                                        label="Source"
                                        button="Save"
                                        v-model:value="updateBody.source"
                                        v-model:error="updateMessage"
                                        @button-click="onUpdate"
                                        @keydown.enter="onUpdate"
                                        required
                                    />
                                </Box>
                                <Button v-else @click="updateOpen = true" icon="ic:round-edit">Update Source</Button>
                            </Transition>
                            <Transition name="blur" mode="out-in">
                                <Button
                                    v-if="deleteConfirm"
                                    @click="onDeleteConfirm"
                                    icon="ic:round-delete-forever"
                                    danger
                                    >Are you sure?</Button
                                >
                                <Button v-else @click="onDelete" icon="ic:round-delete" danger>Delete This</Button>
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
