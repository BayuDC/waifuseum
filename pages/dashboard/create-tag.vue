<script lang="ts" setup>
const body = reactive({
    name: '',
    alias: '',
    slug: '',
});

const { data, error, execute } = useMainFetch<{ tag: Tag }>('/tags', {
    method: 'post',
    immediate: false,
    watch: false,
    body,
});

const { message, validations, loading, submit } = useFormControl(execute);

async function onFormSubmit() {
    if (loading.value) return;

    await submit();

    if (error.value) {
        [message.error, validations.value] = handleFormError(error.value);
    } else {
        message.success = `Created: ${data.value!.tag.id}`;
    }
}

const stopSync = useSyncSlug(body, 'name', 'slug');
</script>

<template>
    <Section title="Create Tag" no-padding>
        <Box>
            <Form @submit="onFormSubmit" v-bind="{ loading, message }" button-text="Create">
                <div class="grid md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <InputText
                        label="Name"
                        class="col-span-2"
                        v-model:value="body.name"
                        v-model:error="validations.name"
                        required
                    />
                    <InputText
                        label="Alias"
                        v-model:value="body.alias"
                        v-model:error="validations.alias"
                        :required="false"
                    />
                    <InputText
                        label="Slug"
                        v-model:value="body.slug"
                        v-model:error="validations.slug"
                        @input.once="stopSync"
                        required
                    />
                </div>
            </Form>
        </Box>
    </Section>
</template>

<style scoped></style>
