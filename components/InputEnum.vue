<script lang="ts" setup>
defineOptions({ inheritAttrs: false });
const props = defineProps<{
    label: string;
    value: string;
    source: string;
    sourceKey: string;
    error?: string;
    required?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:error', error: any): void;
    (e: 'update:value', value: string): void;
}>();

const { class: classes, ...attrs } = useAttrs();

const id = getRandomId();
const state = ref<'default' | 'success' | 'error' | 'loading'>('default');
const search = ref('');
const suggestion = ref('');

const { data, pending } = useLiteFetch<any>(props.source, {
    query: { search, count: 2 },
    immediate: false,
});
pending.value = false;

watchThrottled(
    search,
    () => {
        if (props.error) emit('update:error', undefined);
        state.value = 'default';
    },
    { throttle: 1000 },
);

watchImmediate(toRef(props, 'error'), () => {
    if (props.error) state.value = 'error';
});

watch(data, () => {
    if (data.value && data.value[props.sourceKey].length == 1) {
        suggestion.value = data.value[props.sourceKey][0].slug;
        return;
    }
    suggestion.value = '';
});

function pickSuggestion() {
    if (!suggestion.value) return;

    emit('update:value', suggestion.value);
    suggestion.value = '';
    state.value = 'success';
}
</script>

<template>
    <div class="flex flex-col" :class="[classes]">
        <label :for="id" class="font-bold text-lg text-black/90 italic">
            {{ label }}
            <span class="text-pink" v-show="required">*</span>
        </label>
        <InputBase
            v-bind="{ id, required, ...attrs, state: pending ? 'loading' : state }"
            @input="(e: InputEvent) => (search = (e.target as HTMLInputElement).value)"
            :value="value"
            @update:value="(v: string) => emit('update:value', v)"
            :button="suggestion"
            @button-click="pickSuggestion"
            @keydown.tab="pickSuggestion"
        />
        <span v-show="error" class="text-pink text-right font-medium italic text-sm">{{ error }}</span>
    </div>
</template>

<style scoped></style>
