<script lang="ts" setup>
const loading = ref(false);

const body = reactive({
    fileUrl: '',
    album: '',
    source: '',
});

const { data, error, execute } = await useMainFetch<{ picture: Picture }>('/pictures', {
    body,
    method: 'post',
    immediate: false,
    watch: false,
});

async function onSubmit() {
    if (loading.value) return;

    loading.value = true;
    await execute();
    loading.value = false;
}

onMounted(() => {
    data.value = null;
    error.value = null;
});
</script>

<template>
    <Section title="Upload Picture" no-padding>
        <Box>
            <form @submit.prevent="onSubmit">
                <div class="grid md:grid-cols-2 gap-y-1 gap-x-3 mb-4">
                    <InputText v-model:value="body.fileUrl" label="File URL" required class="md:col-span-2" />
                    <InputText v-model:value="body.album" label="Album" required />
                    <InputText v-model:value="body.source" label="Source" />
                </div>
                <div class="flex items-center justify-end gap-4">
                    <div class="grid">
                        <Transition name="page" mode="out-in">
                            <span v-if="error" class="font-semibold text-pink truncate">{{ error?.data.message }}</span>
                            <span v-else-if="data" class="font-semibold text-green truncate"
                                >Created: {{ data.picture.id }}
                            </span>
                        </Transition>
                    </div>
                    <Button :icon="loading ? 'line-md:loading-twotone-loop' : ''" ignore-hide-text>Submit</Button>
                </div>
            </form>
        </Box>
    </Section>
</template>

<style scoped></style>
