// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true }, app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
        },
    },
    nitro: {
        experimental: {
            websocket: true
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // additionalData: '@import "@/assets/styles/_variables.scss"',
                    // additionalData: '$sass-quiet: true;@import "@/assets/css/hurt.scss";',
                },
            },
        },
    },
    // ssr: false
    modules: [/*'nuxt-socket-io', */'@pinia/nuxt'],
    // io: {
    //     // module options
    //     sockets: [ // Required
    //         { // At least one entry is required
    //             name: 'chat',
    //             url: 'http://localhost:3000',
    //             default: true,
    //             namespaces: { /* see section below */ 
    //                 'chat': {
    //                     emitters: ['message'],
    //                     listeners:['message'],
    //                     emitBacks: ['message']
    //                   }
    //             }
    //         }]
    // }, 
    css: [
        'ress',
        '@/assets/css/main.scss',
        '@/assets/css/hurt.scss',
        '@/assets/css/transitions.scss'
    ],
})