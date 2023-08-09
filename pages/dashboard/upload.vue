<script lang="ts" setup>
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

const { message, loading, validations, submit } = useFormControl(execute);

async function onFormSubmit() {
    if (loading.value) return;

    await submit();

    if (error.value) {
        [message.error, validations.value] = handleFormError(error.value);
    } else {
        message.success = `Created: ${data.value!.picture.id}`;
    }
}
</script>

<template>
    <Section title="Upload Picture" no-padding>
        <Box>
            <Form @submit="onFormSubmit" v-bind="{ message, loading }" button-text="Upload">
                <div class="grid md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <InputText
                        label="File URL"
                        class="col-span-2"
                        v-model:value="body.fileUrl"
                        v-model:error="validations.file"
                        required
                    />
                    <InputEnum
                        label="Album"
                        source="/albums/simple"
                        source-key="albums"
                        v-model:value="body.album"
                        v-model:error="validations.album"
                        required
                    />
                    <InputText label="Source" v-model:value="body.source" v-model:error="validations.source" />
                </div>
            </Form>
            <div class="flex justify-center items-center relative mt-2">
                <div class="relative bg-[#ffffff] z-10 p-2 font-bold text-black/60 text-sm">or import from Pixiv</div>
                <div class="absolute bg-black/40 w-full h-1"></div>
            </div>
            <InputPixiv
                @resolve="
                    (data: any) => {
                        body.source = data.source;
                        body.fileUrl = data.urls.original;
                    }
                "
            />
        </Box>
    </Section>
</template>

<style scoped></style>
