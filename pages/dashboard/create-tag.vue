<script lang="ts" setup>
const body = reactive({
    name: '',
    alias: '',
    slug: '',
});
</script>

<template>
    <Section title="Create Tag" no-padding>
        <Box>
            <div class="grid md:grid-cols-2 gap-x-4 gap-y-2">
                <InputTextPro label="Name" class="col-span-2" v-model:value="body.name" required />
                <InputTextPro label="Alias" v-model:value="body.alias" />
                <InputTextPro label="Slug" v-model:value="body.slug" required />
            </div>
        </Box>
    </Section>
</template>

<style scoped></style>
