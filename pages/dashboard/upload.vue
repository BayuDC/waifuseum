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

const { message, loading, beforeSubmit, afterSubmit } = useForm();

async function onSubmit() {
    beforeSubmit();
    await execute();
    afterSubmit();

    if (error.value) {
        message.error = error.value.data.message;
    } else {
        message.success = `Created: ${data.value!.picture.id}`;
    }
}
</script>

<template>
    <Section title="Upload Picture" no-padding>
        <Box>
            <Form @submit="onSubmit" v-bind="{ message, loading }">
                <div class="grid md:grid-cols-2 gap-y-1 gap-x-3 mb-4">
                    <InputText v-model:value="body.fileUrl" label="File URL" required class="md:col-span-2" />
                    <InputText v-model:value="body.album" label="Album" required />
                    <InputText v-model:value="body.source" label="Source" />
                </div>
            </Form>
        </Box>
    </Section>
</template>

<style scoped></style>
