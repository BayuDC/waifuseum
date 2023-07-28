<script lang="ts" setup>
const appConfig = useAppConfig();
const nuxtApp = useNuxtApp();

nuxtApp.hook('page:finish', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

useSeoMeta({
    title: appConfig.name,
    description: appConfig.description,
    author: appConfig.author.name,
    themeColor: appConfig.color,
    ogType: 'website',
    ogSiteName: appConfig.name,
    ogUrl: appConfig.url,
    ogTitle: appConfig.name,
    ogDescription: appConfig.description,
    ogImage: appConfig.banner.url,
    ogImageType: appConfig.banner.type,
    ogImageHeight: appConfig.banner.height,
    ogImageWidth: appConfig.banner.width,
    twitterImage: appConfig.banner.url,
    twitterCard: 'summary_large_image',
});
</script>

<template>
    <Html class="scroll-smooth">
        <Head>
            <Title>{{ appConfig.name }} | {{ appConfig.description }}</Title>
            <Link rel="canonical" :href="appConfig.url" />

            <Link rel="preconnect" href="https://fonts.googleapis.com" />
            <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
            <Link
                href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,600;0,700;1,700&family=Inter:wght@700&display=swap"
                rel="stylesheet"
            />
            <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </Head>
        <Body class="bg-white text-black">
            <NuxtLayout>
                <NuxtLoadingIndicator :height="4" :color="false" class="bg-green" />
                <NuxtPage />
            </NuxtLayout>
        </Body>
    </Html>
</template>

<style>
.page-enter-active,
.page-leave-active {
    @apply transition duration-300;
}
.page-enter-from,
.page-leave-to {
    @apply opacity-0 blur;
}
</style>
