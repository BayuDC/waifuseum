<script lang="ts" setup>
const body = ref<Record<string, any> | FormData>({});

const fileDecoy = ref('');
const album = ref('');
const source = ref('');

const file = ref<File | null>(null);
const dropZone = ref<HTMLDivElement | null>(null);
const { open, onChange } = useFileDialog({ multiple: false, accept: 'image/jpeg,image/png' });
const { isOverDropZone } = useDropZone(dropZone, chooseFile);
onChange(chooseFile);

const { ignoreUpdates } = watchIgnorable(fileDecoy, () => {
    if (file.value) file.value = null;
});

const { data, error, execute } = await useMainFetch<{ picture: Picture }>('/pictures', {
    body,
    method: 'post',
    immediate: false,
    watch: false,
});

const { message, loading, validations, submit } = useFormControl(execute);

async function onFormSubmit() {
    if (loading.value) return;

    if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value!, file.value?.name);
        formData.append('album', album.value);
        source.value && formData.append('source', source.value);

        body.value = formData;
    } else {
        body.value = {
            album: album.value,
            source: source.value || undefined,
            fileUrl: fileDecoy.value,
        };
    }

    await submit();

    if (error.value) {
        [message.error, validations.value] = handleFormError(error.value);
    } else {
        message.success = `Created: ${data.value!.picture.id}`;
    }
}
function chooseFile(files: FileList | File[] | null) {
    if (!files?.length) return;
    ignoreUpdates(() => {
        fileDecoy.value = files[0].name;
        file.value = files[0];
    });
}
</script>

<template>
    <Section title="Upload Picture" no-padding>
        <div ref="dropZone">
            <Box class="relative overflow-hidden">
                <Form @submit="onFormSubmit" v-bind="{ message, loading }" button-text="Upload">
                    <div class="grid md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                        <InputText
                            label="File/File URL"
                            class="col-span-2"
                            v-model:value="fileDecoy"
                            v-model:error="validations.file"
                            button="Choose"
                            @button-click="open"
                            required
                        />
                        <InputEnum
                            label="Album"
                            source="/albums/simple"
                            source-key="albums"
                            v-model:value="album"
                            v-model:error="validations.album"
                            required
                        />
                        <InputText label="Source" v-model:value="source" v-model:error="validations.source" />
                    </div>
                </Form>
                <div class="flex justify-center items-center relative mt-2">
                    <div class="relative bg-[#ffffff] z-10 p-2 font-bold text-black/60 text-sm">
                        or import from Pixiv
                    </div>
                    <div class="absolute bg-black/40 w-full h-1"></div>
                </div>
                <InputPixiv
                    @resolve="
                        (data: any) => {
                            source = data.source;
                            fileDecoy = data.urls.original;
                        }
                    "
                />

                <Transition name="blur">
                    <div
                        v-show="isOverDropZone"
                        class="bg-green/20 backdrop-blur absolute inset-0 z-20 flex items-center justify-center text-center"
                    >
                        <div class="font-bold text-2xl">Drop you file here!</div>
                    </div>
                </Transition>
            </Box>
        </div>
    </Section>
</template>

<style scoped></style>
