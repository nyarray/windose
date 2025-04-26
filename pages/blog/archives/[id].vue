<template lang="pug">
.archive(v-if="archive?.id")
    .archive-title {{ archive?.title }}
    SMarkdown(:content='archive?.markdown')
SLoading(v-else)
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blog'
})
const store = useMainStore()
const route = useRoute()
const id = route.params.id ? parseInt(route.params.id.toString()) : 0
const archive = computed(() => store.posts.lastViewed)

store.getArchive({ id }).then((result) => store.posts.lastViewed = result)
</script>

<style lang="scss" scoped>
.archive-title {
    font-size: 2rem;
    text-align: center;
}
</style>