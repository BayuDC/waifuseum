export default defineNuxtRouteMiddleware(async (to, from) => {
    if (await login()) return navigateTo('/dashboard/upload');
});
