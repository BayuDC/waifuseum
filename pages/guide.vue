<script lang="ts" setup></script>

<template>
    <Main>
        <Section title="How to Upload" class="text-center">
            <div class="flex flex-col gap-10">
                <GuideCell
                    title="Traditional Way"
                    description="Just pick a file, set the album, provide the source (optional), and then upload it."
                    img-url="/img/guide-1.gif"
                >
                    <GuideCell description="Use an image url instead of a file." img-url="/img/guide-2.gif" />
                </GuideCell>

                <GuideCell
                    title="Import from Pixiv"
                    description="Use a Pixiv post id to automatically fill the 'file' and 'source' fields."
                    img-url="/img/guide-3.gif"
                >
                    <GuideCell description="Or just drop a Pixiv url." img-url="/img/guide-4.gif" />
                </GuideCell>

                <GuideCell
                    title="Drop to Album"
                    description="Drop a file into the album card, and then the upload form will appear."
                    img-url="/img/guide-5.gif"
                >
                    <GuideCell description="Drop a Pixiv url will do the same." img-url="/img/guide-6.gif" />
                </GuideCell>
            </div>
        </Section>
    </Main>
</template>

<style scoped></style>
