export default function useAppear(target: Ref<HTMLElement | null>, appear: () => void) {
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            if (isIntersecting) {
                appear();
                stop();
            }
        },
        { rootMargin: '100px' },
    );
}
