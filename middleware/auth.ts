export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!(await login())) {
        return navigateTo('/login?redirect=' + to.fullPath);
    }
});
