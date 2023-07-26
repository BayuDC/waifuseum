export default function useWatchAppear(target: Ref<HTMLElement | null>, appear: () => void) {
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            if (isIntersecting) {
                appear();
                stop();
            }
        },
        { rootMargin: '-60px' },
    );
}
