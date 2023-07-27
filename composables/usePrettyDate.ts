export default function usePrettyDate(isoDate: string) {
    return new Date(isoDate).toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}
