<script lang="ts" setup>
const props = defineProps<{
    label: string;
    value: string;
    error?: string;
    required?: boolean;
    password?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:value', value: string): void;
}>();

const id = getRandomId();
const type = props.password ? 'password' : 'text';

const value = computed({
    get() {
        return props.value;
    },
    set(value) {
        emit('update:value', value);
    },
});

const classes = computed(() => {
    if (props.error) {
        return 'border-pink/40 bg-pink/10 outline-pink';
    } else if (props.value) {
        return 'border-green/40 bg-green/10 outline-green';
    } else {
        return 'border-gray/40 bg-gray/10 outline-gray';
    }
});
</script>

<template>
    <div class="flex flex-col py-2">
        <label :for="id" class="font-bold text-lg text-black/90 italic">
            {{ label }}
            <span class="text-pink" v-show="required">*</span>
        </label>
        <input
            :type="type"
            :id="id"
            class="border-[4px] font-medium rounded-md p-2 italic"
            :class="[classes]"
            v-model="value"
            :required="required"
        />

        <Transition name="page">
            <span v-show="error" class="text-pink text-right font-medium italic text-sm mt-1">{{ error }}</span>
        </Transition>
    </div>
</template>

<style scoped></style>
