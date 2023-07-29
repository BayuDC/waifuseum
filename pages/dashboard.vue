<script lang="ts" setup>
const routes = [
    { text: 'Upload Picture', dest: '/dashboard/upload' },
    { text: 'Create Album', dest: '/dashboard/create-album' },
    { text: 'Create Tag', dest: '/dashboard/create-tag' },
];

const route = useRoute();
</script>

<template>
    <Main>
        <Section>
            <div class="grid md:grid-cols-[1fr_240px] gap-4 items-start">
                <div>
                    <NuxtPage />
                </div>
                <div class="md:sticky md:top-[144px] md:mt-[92px]">
                    <Box>
                        <ul class="flex flex-col gap-1 font-bold">
                            <li v-for="r in routes">
                                <NuxtLink
                                    class="py-1 px-2 transition rounded-md block"
                                    :class="[route.path == r.dest ? 'bg-green cursor-default' : 'hover:bg-green/20']"
                                    :to="r.dest"
                                    >{{ r.text }}</NuxtLink
                                >
                            </li>
                        </ul>
                    </Box>
                </div>
            </div>
        </Section>
    </Main>
</template>

<style scoped></style>
