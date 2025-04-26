<template lang="pug">
#posts 
    template(v-if="posts && posts.length")
        NuxtLink.post-item(v-for="item in posts" :to="`../archives/${item.id}`") 
            div.post-title {{ item.title }}
            div.post-description {{ item.description }}
    SLoading(v-else)
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'blog'
})
// const length = 5;
// const isSwitching = false;
// const avatar = 'https://avatars.githubusercontent.com/u/28500231?v=4';
// const app = useNuxtApp()
const store = useMainStore()
const router = useRouter()
const route = useRoute()
const page = route.params.page ? parseInt(route.params.page.toString()) : 1
const posts = computed(() => store.posts.list)
// posts[0].description
async function onChange(page: number) {
    router.push({ params: { page } })
}

Promise.all([
    store.getPosts({
        page,
        count: useConfig.archives.paginationSize,
    }),
    store.getLabels(),
    store.getCategorys(),
    store.getAbout(),
])
</script>

<style lang="scss" scoped>
#posts {
    .post-item {
        display: block;
        margin-bottom: 1rem;
    }

    .post-title {
        font-size: 1.2rem;
    }

    .post-description {
        font-size: 1rem;
        filter: brightness(0.8);
    }
}
</style>