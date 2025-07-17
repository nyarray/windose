// API和播放列表id
const musicApi = "https://netease-cloud-music-api-x8ik.vercel.app";
const musicListId = "7490559834";
export default {
    nitro: {
        publicAssets: [
            { baseURL: "/static", dir: "public/static" },
        ],
        //   routeRules: {
        //     '/fonts/**': {
        //       headers: { 'Content-Type': 'font/woff2' }
        //     }    
        //   }
        routeRules: {
            "/static/fonts/**.woff2": {
                headers: {
                    "Content-Type": "font/woff2",
                },
            },
        },
    },
    // 應用程式配置
    app: {
        // 網站標題，可選
        title: "梦的回廊 - May everything be a dream",
        // 網站子標題，可選
        subtitle: "���������������",
        // 網站所有者頭像，可選
        avatar: "https://avatars.githubusercontent.com/u/28500231?v=4",
        // 網站所有者，可選
        owner: "���������������",
        // 自定義的一言，可選
        hitokoto: [
            {
                content: "しおちゃんがいる場所が、私のハッピーシュガーライフ",
                from: "松坂さとう",
            },
            {
                content:
                    "白鳥は　かなしからずや　空の青　海のあをにも　染まずただよふ",
                from: "西園 美魚",
            },
            {
                content:
                    "人的生命就是一场梦，而梦是用璀璨夺目的“魔法”做成的。将它献给樱花树的话，樱花一定会盛开吧。",
                from: "さくら、もゆ",
            },
        ],
        nav: [
            {
                name: "Home",
                icon: "home",
                to: "/blog/",
                theme: { color: "#cd5da0" },
            },
            {
                name: "Blog",
                icon: "blog",
                to: "/blog/posts/1",
                theme: { color: "#cd5da0" },
            },
            {
                name: "Project",
                icon: "project",
                to: "/blog/projects",
                theme: { color: "#f2c047" },
            },
            {
                name: "Idea",
                icon: "idea",
                to: "/blog/idea",
                theme: { color: "#00ccff" },
            },
            // { name: 'Experience', icon: 'experience', to: '/experience' },
            // { name: 'Timeline', icon: 'event_note', to: '/timeline', theme: { color: '#8daacd' } },
            {
                name: "About",
                icon: "about",
                to: "/blog/about",
                theme: { color: "#c7b3d6" },
            },
            // --home-nav-foreground-color1: #cd5da0;
            // --home-nav-foreground-color2: #f2c047;
            // --home-nav-foreground-color3: #8daacd;
            // --home-nav-foreground-color4: #c7b3d6;
            // --home-nav-foreground-color5: #ffb6b9;
        ],
        links: [
            { icon: "github", to: "https://github.com/nyarray" },
            { icon: "twitter", to: "https://twitter.com/nyarray" },
            { icon: "mail", to: "mailto:nyarrays@gmail.com" },
        ],
    },
    // 页面元数据，會出現在頁面的 head 標簽内
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "viewport",
            content:
                "width=device-width,initial-scale=1.0,maximum-scale=1,minimum-scale=1,user-scalable=no",
        },
        {
            hid: "description",
            name: "description",
            content: "",
        },
    ],
    api: {
        // 音乐接口 - 网易云
        musicRequestMethod: async () => {
            try {
                // 无关紧要的部分
                const response = await (await fetch(
                    `${musicApi}/playlist/detail?id=${musicListId}`,
                    { method: "GET", mode: "cors" },
                )).json();
                const ids = response.playlist.trackIds.map((item) => item.id);
                const result = await (await fetch(
                    `${musicApi}/song/detail?ids=${ids.join(",")}`,
                )).json();
                // 按以下接口返回
                // interface Music {
                //     id: number
                //     title: string
                //     artist: string
                //     cover: string
                //     src: string
                // }[]
                return result.songs.map((item) => ({
                    id: item.id,
                    title: item.name,
                    artist: item.ar.map((item) => item.name).toString(),
                    cover: item.al.picUrl
                        ? item.al.picUrl.replace("http://", "https://")
                        : "",
                    src: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
                }));
            } catch (e) {
                console.log(e);
            }
        },
        // 返回原始歌詞數據
        musicLyricRequestMethod: async (id) => {
            const response = await (await fetch(
                `${musicApi}/lyric?id=${id}`,
                { method: "GET", mode: "cors" },
            )).json();
            return response.lrc.lyric;
        },
    },

    // 一言接口（可选)
    // hitokotoAPI: 'https://v1.hitokoto.cn/?c=d',
    // 檔案倉庫，基於Github Issus，檔案接口配置，若考慮GFW，則不要直接在Issue插入圖片，考慮使用外鏈以提升速度和穩定性
    archives: {
        // Github 用户名
        owner: "nyarray",
        // Github 存储檔案的仓库名
        repository: "archives",
        // 每頁顯示的檔案數
        paginationSize: 8,
        // Github Access Token，開放 Issus 只讀權限即可
        token: [
            "github",
            "pat",
            "11AVFM4TA0Vrw4xEU6WbMf_LnKO8dCm6l7mQv1xoWVqM1g1dMjSIh45r4z2yHkSRX87UE2QEZEVfyOAFy9",
        ],
        // token: ['github', 'pat', '11AGZOCBY0A6T5iVnL3Z0C_RIR9j7nBmZYXYvpuaiToHuPHsTbkRovmqT91Ajs6AOi5Q7FU7SA7iqgk9NB'],
    },
    // Cloudflare WorkerKV Access Key，邊緣化的鍵值對儲存，對於 FaaS 兼容性良好
    worker: {
        cfAccountId: "73f266360db938eba304def50b6ebe8a",
        cfEmail: "tsukiseele@gmail.com",
        cfAuthKey: "5532f7da1e745d338b5bca9d8287724e4afcd",
    },
};
