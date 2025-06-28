import type { DesktopApp } from "~/components/NDesktop/index.vue";
import AboutView from "~/views/AboutView.vue";
import BlogView from "~/views/BlogView.vue";
import ChatView from "~/views/ChatView.vue";
import IdeaView from "~/views/IdeaView.vue";
import MugPainting from "~/views/tools/MugPaintingView.vue";
import PlayerView from "~/views/PlayerView/index.vue";
import SearchView from "~/views/SearchView.vue";
import VideoView from "~/views/VideoView.vue";

export interface NWindow {
    readonly id: symbol,
    readonly view: any
    readonly app: DesktopApp
    status: NWindowStatus
}

export interface NWindowStatus {
    isMinimize: boolean
}

function createWindow(app: DesktopApp, view: any, status?: NWindowStatus): NWindow {
    return { id: Symbol(), view: markRaw(view), app, status: status || { isMinimize: false } }
}

export const useDesktopApps: DesktopApp[] = [{
    icon: '/images/icon/icon_desktop_text.png',
    title: 'About',
    key: 'about',
    click: function (): NWindow {
        return createWindow(this, AboutView)
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_youtube2.png',
    title: 'Video',
    key: 'video',
    click: function (): NWindow {
        return createWindow(this, VideoView)
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_internet.png',
    title: 'Search',
    key: 'search',
    click: function (): NWindow {
        return createWindow(this, SearchView)
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_jine2.png',
    title: 'Chat',
    key: 'chat',
    click: function (): NWindow {
        return createWindow(this, ChatView)
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_folder_open2.png',
    title: 'Archives',
    key: 'archives',
    click: function (e) {
        return createWindow(this, BlogView)
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_darkness.png',
    title: 'Idea',
    key: 'idea',
    click: function (e): NWindow {
        return createWindow(this, IdeaView)
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_music.png',
    title: 'Music',
    key: 'music',
    // click: function (): void {
    //     const router = useRouter()
    //     router.push('/blog')
    // },
    click: function (e): NWindow {

        return createWindow(this, PlayerView)
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_okashi.png',
    title: 'Okashi',
    key: 'okashi',
    // click: function (): void {
    //     const router = useRouter()
    //     router.push('/blog')
    // },
    click: function (e): void {

        // return { id: Symbol(), view: PlayerView, data: this }
        // return { id: Symbol(), view: BlogView, data: this }
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_okusuri.png',
    title: 'Okusuri',
    key: 'okusuri',
    // click: function (): void {
    //     const router = useRouter()
    //     router.push('/blog')
    // },
    click: function (e): void {

        // return { id: Symbol(), view: PlayerView, data: this }
        // return { id: Symbol(), view: BlogView, data: this }
    },
    data: undefined
},
{
    icon: '/images/icon/icon_desktop_2ch.png',
    title: 'Mug',
    key: 'mug',
    // click: function (): void {
    //     const router = useRouter()
    //     router.push('/blog')
    // },
    click: function (e): NWindow {

        // return { id: Symbol(), view: PlayerView, data: this }
        // return { id: Symbol(), view: BlogView, data: this }
        
        return createWindow(this, MugPainting)
    },
    data: undefined
},{
    icon: '/images/icon/icon_desktop_2ch.png',
    title: 'Mug',
    key: 'mug',
    // click: function (): void {
    //     const router = useRouter()
    //     router.push('/blog')
    // },
    click: function (e): NWindow {

        // return { id: Symbol(), view: PlayerView, data: this }
        // return { id: Symbol(), view: BlogView, data: this }
        
        return createWindow(this, MugPainting)
    },
    data: undefined
},
]
// const icons = [
//     {
//         icon: "/images/icon/icon_desktop_2ch.png",
//     }, {
//         icon: '/images/icon/icon_desktop_asobu.png'
//     }, {
//         icon: "/images/icon/icon_desktop_darkness.png"
//     }, {
//         icon: "/images/icon/icon_desktop_egosearch.png"
//     }, {
//         icon: "/images/icon/icon_desktop_folder_open1.png"
//     }, {
//         icon: "/images/icon/icon_desktop_folder_open2.png"
//     }, {
//         icon: "/images/icon/icon_desktop_folder_zip.png"
//     }, {
//         icon: "/images/icon/icon_desktop_game.png"
//     }, {
//         icon: "/images/icon/icon_desktop_hnakoto.png"
//     }, {
//         icon: "/images/icon/icon_desktop_ichatsuku.png"
//     }, {
//         icon: "/images/icon/icon_desktop_internet.png"
//     }, {
//         icon: "/images/icon/icon_desktop_jine2.png"
//     }, {
//         icon: "/images/icon/icon_desktop_movie.png"
//     },
//     //  {
//     //     icon: "/images/icon/icon_desktop_neru_evening.png"
//     // }, {
//     //     icon: "/images/icon/icon_desktop_neru_night.png"
//     // }, {
//     //     icon: "/images/icon/icon_desktop_neru_noon.png"
//     // },
//     {
//         icon: "/images/icon/icon_desktop_neru.png"
//     }, {
//         icon: "/images/icon/icon_desktop_okashi.png"
//     }, {
//         icon: "/images/icon/icon_desktop_okusuri.png"
//     }, {
//         icon: "/images/icon/icon_desktop_text.png"
//     }, {
//         icon: "/images/icon/icon_desktop_tinder.png"
//     }, {
//         icon: "/images/icon/icon_desktop_twitter.png"
//     }, {
//         icon: "/images/icon/icon_desktop_youtube.png",
//         // event:
//         click: () => { }
//     },
//     // {
//     //     icon: "/images/icon/icon_desktop_youtube2.png"
//     // }
// ]