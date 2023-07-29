// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/robots', '@vueuse/nuxt', '@vueuse/motion/nuxt'],
    runtimeConfig: {
        public: {
            apiLiteUrl: process.env.API_LITE_URL,
            apiMainUrl: process.env.API_MAIN_URL,
        },
    },

    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },

    routeRules: {
        '/dashboard/**': { ssr: false },
    },
});
