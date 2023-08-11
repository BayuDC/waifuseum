export const usePictureState = () => {
    const body = useState('picture-body', () => ({
        album: '',
        source: '',
        fileUrl: '',
        pixivId: '',
    }));
    const file = useState<File | null>('picture-file', () => null);
    const control = useState<{ open: boolean; callback: ((p: Picture) => void) | undefined }>(
        'picture-control',
        () => ({
            open: false,
            callback: undefined,
        }),
    );

    return {
        body,
        file,
        control,
    };
};

export const resetPictureState = () => {
    const { body, file, control } = usePictureState();
    body.value = {
        album: '',
        source: '',
        fileUrl: '',
        pixivId: '',
    };
    file.value = null;
    control.value = {
        open: false,
        callback: undefined,
    };
};
