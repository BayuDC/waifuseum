<script lang="ts" setup>
definePageMeta({ layout: 'empty' });
const code = useRoute().query.code;

const { data, error } = await useMainFetch('/auth/login/discord', {
    method: 'post',
    body: { code },
});

if (error.value) throw showErrorSimplify(error);

navigateTo('/dashboard/upload');
</script>

<template>
    <div class="min-h-screen flex justify-center items-center">
        <Loading />
    </div>
</template>

<style scoped></style>
