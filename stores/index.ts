import { defineStore } from 'pinia'
// import { useLocalStorage } from "@vueuse/core"
import { formatPost, formatJson, formatGallery, formatTimeline, formatPage, formatInspiration } from '../plugins/utils/format.js'
import { useNuxtApp } from 'nuxt/app';

export const useMainStore = defineStore('main', {
    state: () => ({
        // posts: useLocalStorage('posts', {
        posts: {
            page: 0,
            totalCount: 0,
            list: <Post[]>[],
            lastViewed: <Post | undefined>undefined
        },
        clientWidth: 0,
        scroll: { pos: 0, change: 0 },
        images: [],
        inspiration: <InspirationResponse[]>[],
        about: <Page[]>[],
        friends: <Page[]>[],
        projects: <Projects | undefined>undefined,
        labels: <LabelResponse[]>[],
        categorys: <any | undefined>undefined,
        timeline: <Timeline | undefined>undefined,
        experience: undefined,
    }),
    // getters: {
    //   breakpoints(state, size) {
    //     const breakpoints = {
    //       tablet: 760,
    //       mobile: 480,
    //     }
    //     return breakpoints[size] && breakpoints[size] < state.clientWidth
    //   },
    //   isMobile(state) {
    //     return state.clientWidth < 768
    //   },
    // }
    // ,
    // mutations: {
    //   posts(state: any, args: any) {
    //     args instanceof Array ? (state.posts[args[0]] = args[1]) : (state.posts = args)
    //   },
    // },
    actions: {
        /**
         * 获取与
         * @param {Context} context 上下文
         * @param {Object} params 分页参数
         * @returns {Array<Archive>} 文章列表
         */
        async getPosts({ page = 1, count = 10 }): Promise<Post[] | undefined> {
            if (this.posts.page === page) return
            const result = await useApi.fetchPosts({ page, count })
            if (result) {
                const totalCount = result.total_count
                this.posts = { page, totalCount, list: result.items.map((item) => formatPost(item)), lastViewed: undefined }
            }
        },
        /**
         * 通过id获取文章
         * @param {Context} context 上下文
         * @param {Object} id 文章id
         */
        async getArchive({ id }: { id: number }): Promise<Post | undefined> {
            // 先从缓存里面找s
            if (this.posts.list?.length) {
                return this.posts.list.find((item) => item.id == id)
            } else {
                // 如果没有找到就请求
                return formatPost(await useApi.fetchArchiveById(id))
            }
        },
        /**
         *
         * @param {*} param0
         * @returns
         */
        // async getImages() {
        //   if (this.images.length > 0) return
        //   const app = useNuxtApp()
        //   this.images = [].concat(...(await useApi.getPosts({ page: 1, count: 99 })).map((item) => formatGallery(item))).slice(0, 20)
        // },
        /**
         * 获取时间线
         * @param {*} param0
         * @returns
         */
        async getTimeline(): Promise<Timeline | undefined> {
            if (this.timeline && this.timeline.size) return
            const app = useNuxtApp()
            if (!this.posts.totalCount)
                await this.getPosts({ page: 1, count: 1 })
            const response = await useApi.fetchPosts({ page: 1, count: this.posts.totalCount })
            this.timeline = formatTimeline(response.items)
        },
        /**
         * 获取标签列表
         * @param {Context} context 上下文
         */
        async getLabels() {
            if (this.labels.length) return
            // 如果没有找到就请求
            this.labels = await useApi.fetchLabels()
        },
        /**
         * 获取分类列表
         * @param {Context} context 上下文
         */
        async getCategorys() {
            if (this.categorys) return
            this.categorys = await useApi.fetchMilestones()
        },
        /**
         *
         * @param {*} param0
         * @param {*} param1
         */
        async getInspiration({ page = 1, count = 10 }) {
            this.inspiration = formatInspiration(await useApi.fetchInspiration({ page, count }))
        },
        /**
         * 获取关于
         * @param {*} param0
         */
        async getAbout() {
            if (this.about.length) return
            const about = await useApi.fetchPage('about')
            if (about && about[0]) {
                this.about = formatPage(about[0], 'about')
            }
        },
        /**
         * 获取友链
         */
        async getFriends() {
            if (this.friends && this.friends.length) return
            const friends = await useApi.fetchPage('friend')
            if (friends && friends[0]) {
                this.friends = formatPage(friends[0], 'friend')
            }
        },
        /**
         * 获取项目
         */
        async getProjects() {
            if (this.projects?.length) return
            const projects = (await Promise.all([useApi.fetchPage('projects'), useApi.fetchPage('websites')])).map(item => item[0])
            this.projects = projects.map((item) => {
                const name = item.title.toLowerCase()
                return { name, items: formatPage(item, item.title.toLowerCase()) }
            })
        },
        /**
         *
         * @param {*} param0
         * @returns
         */
        async getExperience() {
            if (this.experience) return
            const experience = await useApi.fetchPage('experience')
            if (experience && experience[0]) {
                this.experience = formatJson(experience[0])
            }
        },
    }
})