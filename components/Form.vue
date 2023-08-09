<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        message: {
            success: string;
            error: string;
        };
        loading: boolean;
        buttonText?: string;
    }>(),
    {
        buttonText: 'Submit',
    },
);

const emit = defineEmits<{
    (e: 'submit'): Promise<void>;
}>();
</script>

<template>
    <form @submit.prevent="emit('submit')">
        <slot />

        <div class="flex items-center justify-end gap-4">
            <div class="grid">
                <Transition name="blur" mode="out-in">
                    <span v-if="message.error" class="font-semibold text-pink truncate italic">
                        {{ message.error }}
                    </span>
                    <span v-else-if="message.success" class="font-semibold text-green truncate italic">
                        {{ message.success }}
                    </span>
                </Transition>
            </div>
            <Button :icon="loading ? 'line-md:loading-twotone-loop' : ''" ignore-hide-text>
                {{ buttonText }}
            </Button>
        </div>
    </form>
</template>

<style scoped></style>
