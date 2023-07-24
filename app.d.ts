declare global {
    interface Album {
        id: string;
        name: string;
        slug: string;
        private: boolean;
        community: boolean;
        picturesCount: number;
        pictures: Picture[];
        createdBy: User;
        createdAt: string;
        updatedAt: string;
    }
    interface Picture {
        id: string;
        url: string;
        urls: {
            thumbnail: string;
            minimal: string;
            standard: string;
            original: string;
        };
        source: string;
        createdAt: string;
        updatedAt: string;
    }
    interface User {
        id: string;
        name: string;
    }
}

export {};
