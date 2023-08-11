export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return;
    login();
});
