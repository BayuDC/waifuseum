<script lang="ts" setup>
const body = reactive({
    name: '',
    alias: '',
    slug: '',
    tags: [''],
    community: true,
    description: '',
});

const { data, error, execute } = await useMainFetch<{ album: Album }>('/albums', {
    body,
    method: 'post',
    immediate: false,
    watch: false,
});

const { message, loading, validations, submit } = useFormControl(execute);

async function onFormSubmit() {
    if (loading.value) return;

    body.description = body.name;
    await submit();

    if (error.value) {
        [message.error, validations.value] = handleFormError(error.value);
    } else {
        message.success = `Created: ${data.value!.album.id}`;
    }
}

const stopSync = useSyncSlug(body, 'name', 'slug');
</script>

<template>
    <Section title="Create Album" no-padding>
        <Box>
            <Form @submit="onFormSubmit" :loading="loading" :message="message" button-text="Create">
                <div class="grid md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <InputText label="Name" v-model:value="body.name" v-model:error="validations.name" required />
                    <InputText label="Alias" v-model:value="body.alias" v-model:error="validations.alias" />
                    <InputText
                        label="Slug"
                        v-model:value="body.slug"
                        v-model:error="validations.slug"
                        @input.once="stopSync"
                        required
                    />
                    <InputEnum
                        label="Tag"
                        source="/tags/simple"
                        source-key="tags"
                        v-model:value="body.tags[0]"
                        v-model:error="validations['tags[0]']"
                        required
                    />
                </div>
            </Form>
        </Box>
    </Section>
</template>

<style scoped></style>
