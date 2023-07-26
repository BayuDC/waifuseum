export default function useInfinite(onVisible: () => void) {
    const lastChild = ref<HTMLElement | null>(null);

    const { stop } = useIntersectionObserver(
        lastChild,
        ([{ isIntersecting }]) => {
            if (isIntersecting) onVisible();
        },
        { rootMargin: '400px' },
    );

    return {
        setup(parent: HTMLElement) {
            lastChild.value = parent.lastElementChild as HTMLElement;
        },
        stop,
    };
}
