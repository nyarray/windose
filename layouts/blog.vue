<template lang="pug">
#blog
    ul.nav
        li.nav-item(v-for="nav in useConfig.app.nav")
            NuxtLink(:to="nav.to") {{ nav.name }}
    //- KeepAlive
    //- Transition
    Suspense
        slot
    //- TheNyanPlayer(v-if='musics && musics.length', :musics='musics', :fetch-lyric='useConfig.api.musicLyricRequestMethod')

</template>


<script setup lang="ts">
interface PlayList {
    id: number
    title: string
    artist: string
    cover: string
    src: string
}[]
let musics: Ref<PlayList | undefined> = ref()

useConfig.api.musicRequestMethod().then(result => musics.value = result)

</script>

<style lang="scss" scoped>
#blog {
  margin: 0 auto;
  padding: 1rem 2rem;
  max-width: 960px;
  overflow-x: hidden;
}

.nav {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-item {
    padding: 0 1rem;
    display: inline-block;
  }
}
</style>