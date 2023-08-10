declare global {
    interface Album {
        id: string;
        name: string;
        slug: string;
        alias: string;
        private: boolean;
        community: boolean;
        picturesCount: number;
        pictures: Picture[];
        tags: Tag[];
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
        album?: Album;
        source: string;
        createdBy: user;
        createdAt: string;
        updatedAt: string;
    }
    interface User {
        id: string;
        name: string;
    }

    interface Tag {
        id: string;
        name: string;
        alias: string;
        slug: string;
    }
}

export {};
