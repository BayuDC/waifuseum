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
            <div class="mt-6">
                <div class="font-medium italic text-lg">
                    Feel confused?
                    <NuxtLink to="/guide" class="underline"
                        >Click here to see how to upload your beloved waifu.</NuxtLink
                    >
                </div>
            </div>
        </PictureDrop>
    </Section>
</template>

<style scoped></style>
