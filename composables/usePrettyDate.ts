export default function usePrettyDate(isoDate: string, full?: boolean) {
    return new Date(isoDate).toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function usePrettyTime(isoDate: string) {
    return new Date(isoDate).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
}
