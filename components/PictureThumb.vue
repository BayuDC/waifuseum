<script lang="tsx" setup>
import { Icon } from '@iconify/vue';
import { useLazyload } from 'vue3-lazyload';

const props = defineProps<{
    url: string | undefined;
}>();

const ready = ref(false);
const error = ref(!props.url);

const element = error
    ? useLazyload(toRef(props, 'url') as Ref<string>, {
          lifecycle: {
              loaded: () => (ready.value = true),
              error: () => (error.value = true),
          },
          observerOptions: {
              rootMargin: '200px',
          },
      })
    : ref();

const MyIcon = defineComponent(
    (props) => {
        return () => (
            <div class="text-green h-full flex items-center justify-center">
                <Icon icon={props.icon} width={54} height={54} />
            </div>
        );
    },
    { props: ['icon'] },
);
</script>

<template>
    <div class="overflow-hidden rounded-md aspect-square bg-green/20 border-green border-[4px]">
        <MyIcon v-if="error" icon="ic:outline-hide-image" />
        <template v-else>
            <MyIcon v-if="!ready" icon="line-md:loading-twotone-loop" />
            <img
                class="w-full h-full object-cover object-top transition group-hover:scale-105"
                :class="[ready ? 'opacity-100' : 'opacity-0 blur']"
                ref="element"
            />
        </template>
    </div>
</template>

<style scoped></style>
