export default defineAppConfig({
    name: 'Waifuseum',
    description: 'The Gallery of Cute Anime Girls',
    author: { name: 'BayuDC', url: 'https://bayudc.fun' },
    color: '#23ce6b',
    url: 'https://waifuseum.bayudc.fun',
    banner: {
        url: 'https://media.discordapp.net/attachments/946013429200723989/1134386198467592223/banner_waifuseum_compressed.png',
        type: 'image/png' as 'image/png' | 'image/jpeg' | 'image/gif',
        width: 1280,
        height: 640,
    },
    discordUrl: 'https://discord.gg/8sSfCNCXHW',
    featuredAlbums: [
        '62bbecc4f7852e29d7c5b923',
        '62b7e9d1b2a63c625fc3e7f4',
        '62db96bc485f668eb4e71fa4',
        '62f70734a3b3f5c32aeb1b5d',
    ],
});
