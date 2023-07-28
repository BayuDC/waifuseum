<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const appConfig = useAppConfig();
</script>

<template>
    <div class="bg-black py-6 text-white/80 font-semibold text-sm">
        <Container class="px-5 md:px10 flex items-center justify-center gap-2">
            <div>
                Made with ❤️ by
                <NuxtLink
                    class="font-bold hover:underline hover:text-white/100 transition"
                    external
                    :to="appConfig.author.url"
                >
                    {{ appConfig.author.name }}
                </NuxtLink>
            </div>
            <span>|</span>
            <div>
                <NuxtLink external :to="appConfig.discordUrl" class="hover:text-white/100 transition">
                    <Icon icon="ic:round-discord" :width="24" :height="24" />
                </NuxtLink>
            </div>
        </Container>
    </div>
</template>

<style scoped></style>
