export function useSyncSlug<T extends {}>(root: T, source: keyof T, target: keyof T) {
    return watch(toRef(root, source), () => {
        // @ts-ignore
        root[target] = (root[source] as string).toLocaleLowerCase().replaceAll(' ', '-');
    });
}
