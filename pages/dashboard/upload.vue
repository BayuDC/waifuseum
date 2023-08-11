<script lang="ts" setup></script>

<template>
    <Section title="Upload Picture" no-padding>
        <PictureDrop v-slot="{ isOver }">
            <Box class="relative overflow-hidden">
                <PictureForm />
                <PixivImporter />

                <Transition name="blur">
                    <BoxOverlay v-if="isOver" class="bg-green/40">Drop your file here!</BoxOverlay>
                </Transition>
            </Box>
        </PictureDrop>
    </Section>
</template>

<style scoped></style>
