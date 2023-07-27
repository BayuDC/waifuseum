import type { Variant } from '@vueuse/motion';

export default function usePopMotion(target: Ref<HTMLElement | null>, before: Variant, after: Variant) {
    const { apply } = useMotion(target, {
        initial: before,
    });
    useAppear(target, () => {
        apply(after);
    });
}
