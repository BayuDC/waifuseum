<script lang="ts" setup>
const props = defineProps<{
    label: string;
    value: string;
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
</script>

<template>
    <div class="flex flex-col py-2">
        <label :for="id" class="font-bold text-lg text-black/90">{{ label }}</label>
        <input
            :type="type"
            :id="id"
            class="border-[4px] font-medium rounded-md p-2 outline-green"
            :class="[value ? 'border-green/40 bg-green/10' : 'border-gray/40 bg-gray/10']"
            v-model.lazy="value"
        />
    </div>
</template>

<style scoped></style>
