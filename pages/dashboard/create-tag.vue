<script lang="ts" setup></script>

<template>
    <Section title="Create Tag" no-padding>
        <Box>
            <div class="grid md:grid-cols-2 gap-x-3 mb-4">
                <InputBase state="" type="text" button="" />
                <InputBase state="loading" type="text" />
                <InputBase state="error" type="text" />
                <InputBase state="success" type="text" />
            </div>
        </Box>
    </Section>
</template>

<style scoped></style>
