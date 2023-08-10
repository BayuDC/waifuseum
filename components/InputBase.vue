<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        value?: string;
        state?: 'default' | 'success' | 'error' | 'loading';
        button?: string;
    }>(),
    {
        state: 'default',
        value: '',
    },
);

const emit = defineEmits<{
    (e: 'update:value', value: string): void;
    (e: 'update:state', state: 'default' | 'success' | 'error' | 'loading'): void;
    (e: 'button-click'): void;
}>();

const { class: classes, ...attrs } = useAttrs();

const value = computed({
    get: () => props.value,
    set: (value) => emit('update:value', value),
});
const state = computed({
    get: () => props.state,
    set: (state) => emit('update:state', state),
});

const variant = computed(() => {
    switch (state.value) {
        case 'success':
            return 'border-green/40 bg-green/10 outline-green';
        case 'error':
            return 'border-pink/40 bg-pink/10 outline-pink';
        default:
            return 'border-gray/40 bg-gray/10 outline-gray';
    }
});
</script>

<template>
    <div :class="[classes]" class="relative">
        <input
            v-bind="attrs"
            v-model="value"
            :class="[variant]"
            class="border-[4px] font-medium rounded-md p-2 italic w-full"
        />
        <Transition name="blur" mode="out-in">
            <span
                v-show="button || state == 'loading'"
                class="absolute right-2 top-0 translate-y-[50%] italic font-medium text-black px-2 rounded-md bg-green/100 transition"
                :class="{ 'cursor-pointer': button }"
                @click="emit('button-click')"
            >
                {{ button ? button : '...' }}
            </span>
        </Transition>
    </div>
</template>

<style scoped></style>
