<template lang="pug">
#about
    .header  
        //- .header__avatar-wrapper
            img.header__avatar(src="https://avatars.githubusercontent.com/u/28500231?v=4")
        //- span.letter__wrapper(v-for="char in name.toLowerCase()" )
            .letter(:class="char")
    .about.card
        .blockquote
            s-icon(name='quote').quote-left
            .quote-content 夢の中に
            s-icon(name='quote').quote-right
        .description(v-for='(part, i) in store.about', :key='i')
            hr
            .subtitle {{ part.title }}
            SMarkdown(:content='part.content')
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blog'
})
const store = useMainStore()

Promise.all([store.getAbout()])
</script>

<style lang="scss" scoped></style>