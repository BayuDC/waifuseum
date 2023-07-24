// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/robots', '@vueuse/nuxt'],
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
        },
    },
});
