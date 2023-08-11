export const usePictureState = () => {
    const body = useState('picture-body', () => ({
        album: '',
        source: '',
        fileUrl: '',
        pixivId: '',
    }));
    const file = useState<File | null>('picture-file', () => null);

    return {
        body,
        file,
    };
};
