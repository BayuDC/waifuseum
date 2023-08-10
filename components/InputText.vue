<script lang="ts" setup>
defineOptions({ inheritAttrs: false });
const props = defineProps<{
    label: string;
    value: string;
    error?: string;
    required?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:error', error: any): void;
}>();

const { class: classes, ...attrs } = useAttrs();

const id = getRandomId();
const state = ref<'default' | 'success' | 'error'>('default');

watchThrottled(
    toRef(props, 'value'),
    () => {
        state.value = props.value ? 'success' : 'default';
        if (props.error) emit('update:error', undefined);
    },
    { throttle: 1000 },
);

watchImmediate(toRef(props, 'error'), () => {
    if (props.error) state.value = 'error';
});
</script>

<template>
    <div class="flex flex-col" :class="[classes]">
        <label :for="id" class="font-bold text-lg text-black/90 italic">
            {{ label }}
            <span class="text-pink" v-show="required">*</span>
        </label>
        <InputBase v-bind="{ id, required, ...attrs, state }" :value="value" />
        <span v-show="error" class="text-pink text-right font-medium italic text-sm">{{ error }}</span>
    </div>
</template>

<style scoped></style>
