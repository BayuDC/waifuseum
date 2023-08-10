// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/robots', '@vueuse/nuxt', '@vueuse/motion/nuxt'],
    runtimeConfig: {
        public: {
            apiLiteUrl: process.env.API_LITE_URL,
            apiMainUrl: process.env.API_MAIN_URL,
            discordAuthUrl: process.env.DISCORD_AUTH_URL,
        },
    },

    app: {
        pageTransition: { name: 'blur', mode: 'out-in' },
        layoutTransition: { name: 'blur', mode: 'out-in' },
    },

    routeRules: {
        '/': { isr: 60 * 5 },
        '/dashboard': { redirect: '/dashboard/upload' },
        '/dashboard/**': { ssr: false },
        '/login/**': { ssr: false },
        '/logout': { ssr: false },
    },
});
