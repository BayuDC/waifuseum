<script lang="ts" setup>
const body = reactive({
    name: '',
    alias: '',
    slug: '',
    tags: [''],
    community: true,
    description: '',
});
const unwatch = watch(toRef(body, 'name'), () => {
    body.slug = body.name.toLocaleLowerCase().replaceAll(' ', '-');
});

const { data, error, execute } = await useMainFetch<{ album: Album }>('/albums', {
    body,
    method: 'post',
    immediate: false,
    watch: false,
});

const { message, loading, beforeSubmit, afterSubmit } = useForm();

async function onSubmit() {
    if (loading.value) return;

    body.description = body.name;
    beforeSubmit();
    await execute();
    afterSubmit();

    if (error.value) {
        message.error = error.value.data.message;
    } else {
        message.success = `Created: ${data.value!.album.id}`;
    }
}
</script>

<template>
    <Section title="Create Album" no-padding>
        <Box>
            <Form @submit="onSubmit" :loading="loading" :message="message">
                <div class="grid md:grid-cols-2 gap-x-3 mb-4">
                    <InputText label="Name" v-model:value="body.name" :error="error?.data.details.name" required />
                    <InputText label="Alias" v-model:value="body.alias" :error="error?.data.details.alias" />
                    <InputText
                        label="Slug"
                        v-model:value="body.slug"
                        :error="error?.data.details.slug"
                        @input.once="unwatch"
                        required
                    />
                    <InputText
                        label="Tag"
                        v-model:value="body.tags[0]"
                        :error="error?.data.details['tags[0]']"
                        required
                    />
                </div>
            </Form>
        </Box>
    </Section>
</template>

<style scoped></style>
