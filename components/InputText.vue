<script lang="ts" setup>
const props = defineProps<{
    label: string;
    value: string;
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
</script>

<template>
    <div class="flex flex-col py-2">
        <label :for="id" class="font-bold text-lg text-black/90">
            {{ label }}
            <span class="text-pink" v-show="required">*</span>
        </label>
        <input
            :type="type"
            :id="id"
            class="border-[4px] font-medium rounded-md p-2"
            :class="[value ? 'border-green/40 bg-green/10 outline-green' : 'border-gray/40 bg-gray/10 outline-gray']"
            v-model="value"
            :required="required"
        />
    </div>
</template>

<style scoped></style>
