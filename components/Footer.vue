<script lang="ts" setup>
const appConfig = useAppConfig();
const config = useRuntimeConfig();

const navs = [
    { text: 'Dashboard', dest: '/dashboard' },
    { text: 'How to Upload', dest: '/guide' },
    { text: 'API Docs', dest: config.public.apiLiteUrl + '/docs' },
    { text: 'Statistics', dest: '/stats' },
    { text: 'Discord Server', dest: appConfig.discordUrl },
];

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
    <footer class="bg-black">
        <div class="py-8 text-white/80 font-semibold">
            <Container class="px-5 md:px-10 flex justify-center">
                <ul class="flex flex-wrap md:gap-x-8 gap-x-6 gap-y-2 justify-center text-center">
                    <li v-for="(nav, i) in navs" :key="i">
                        <NuxtLink class="hover:text-green transition" :to="nav.dest">{{ nav.text }}</NuxtLink>
                    </li>
                    <li class="w-full sm:w-auto hover:text-green transition">
                        <button @click="scrollToTop">Back to Top</button>
                    </li>
                </ul>
            </Container>
        </div>

        <div class="py-2 text-black bg-green font-semibold opacity-80">
            <Container class="px-5 md:px-10 flex items-center justify-center gap-2">
                <div class="text-sm">
                    Made with ❤️ by
                    <NuxtLink class="font-bold hover:underline transition" external :to="appConfig.author.url">
                        {{ appConfig.author.name }}
                    </NuxtLink>
                </div>
            </Container>
        </div>
    </footer>
</template>

<style scoped></style>
