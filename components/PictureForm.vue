<script lang="ts" setup>
const emit = defineEmits<{
    (e: 'uploaded', picture: Picture): void;
}>();

const { body: pictureBody, file: pictureFile, control: pictureControl } = usePictureState();
onUnmounted(resetPictureState);

const body = ref<Record<string, any> | FormData>({});

const { data, error, execute } = await useMainFetch<{ picture: Picture }>('/pictures', {
    body,
    method: 'post',
    immediate: false,
    watch: false,
});

const { message, loading, validations, submit } = useFormControl(execute);
const { open, onChange } = useFileDialog({ multiple: false, accept: 'image/jpeg,image/png' });

const { ignoreUpdates } = watchIgnorable(
    () => pictureBody.value.fileUrl,
    () => pictureFile.value && (pictureFile.value = null),
);
watchImmediate(pictureFile, () => {
    if (!pictureFile.value) return;
    ignoreUpdates(() => {
        pictureBody.value.fileUrl = pictureFile.value!.name;
    });
});

onChange((files) => {
    if (!files?.length) return;
    pictureFile.value = files[0];
});

async function onFormSubmit() {
    if (loading.value) return;

    if (pictureFile.value) {
        const formData = new FormData();
        formData.append('file', pictureFile.value!, pictureFile.value?.name);
        formData.append('album', pictureBody.value.album);
        if (pictureBody.value.source) {
            formData.append('source', pictureBody.value.source);
        }

        body.value = formData;
    } else {
        body.value = {
            album: pictureBody.value.album,
            source: pictureBody.value.source || undefined,
            fileUrl: pictureBody.value.fileUrl,
        };
    }

    await submit();

    if (error.value) {
        [message.error, validations.value] = handleFormError(error.value);
    } else {
        message.success = `Created: ${data.value!.picture.id}`;
        if (pictureControl.value.callback) {
            pictureControl.value.callback(data.value!.picture);
        }
    }
}
</script>

<template>
    <Form v-bind="{ message, loading }" @submit="onFormSubmit">
        <div class="grid md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
            <InputText
                label="File"
                class="col-span-2"
                v-model:value="pictureBody.fileUrl"
                v-model:error="validations.file"
                button="Choose"
                @button-click="open"
                required
            />
            <InputEnum
                label="Album"
                source="/albums/simple"
                source-key="albums"
                v-model:value="pictureBody.album"
                v-model:error="validations.album"
                required
            />
            <InputText label="Source" v-model:value="pictureBody.source" v-model:error="validations.source" />
        </div>
        <template #button>
            <Button :icon="loading ? 'line-md:upload-loop' : 'ic:round-upload'">Upload</Button>
        </template>
    </Form>
</template>

<style scoped></style>
