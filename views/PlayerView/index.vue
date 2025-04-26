<template lang="pug">
    NWindow#player-view(width="70%", height="80%")
        .hurt-player(v-if="musics && musics.length")
            .hurt-player__main
                
                ul.hurt-player__list  
                    li.hurt-player__list-item(v-for="(music, i) in musics" :key="music.id" @click="onSwitchMusic(i)" :class="{active: music.id == currentMusic.id}") 
                        //- .list-item__number {{ (i + 1).toString().padStart(2, '0') }}
                        img.list-item__cover(:src="music.cover") 
                        .list-item__inner
                            .list-item__title {{ music.title }}
                            .list-item__artist {{ music.artist }}
                
                .hurt-player__lyrics
                    ul.lyrics
                        li.lrc(v-for="(lrc, index) in lyrics" :class="{ active: currentLyricLine == index }") {{ lrc.text }}
            hr
            .hurt-player__controls
                audio.hurt-player__audio(:src="currentMusic.src" ref='audio' )
                img.controls-cover(:src="currentMusic.cover")
                .controls
                    .controls-desc
                        .controls-title {{ currentMusic.title }}
                        .controls-artist {{ currentMusic.artist }}
                    .controls-main
                        .controls-options
                            .controls-prev(@click="onPlayControl(-1)") |<
                            .controls-play(v-if="status.isPause" @click="onResume") >>
                            .controls-pause(v-else @click="onPause") ||
                            .controls-next(@click="onPlayControl(1)") >|
                        .controls-timer {{ currentTimeText }}
                        .controls-seekbar(:style="`--progress: ${sliderValue * 100}%;`")
        SLoading(v-else)
        //- TheNyanPlayer(music)
        //- TheNyanPlayer(v-if='musics && musics.length', :musics='musics', :fetch-lyric='useConfig.musicLyricRequestMethod')
    
    
    </template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

interface Music {
    id: number
    title: string
    artist: string
    cover: string
    src: string
}
const audio = useTemplateRef<HTMLAudioElement>('audio')
const musics = ref<Music[] | undefined>()
const lyrics = ref<Lyric[] | undefined>()
const currentMusic = ref<Music>()
const status = reactive({
    isPause: true,
    currentTime: 0,
    duration: 0,
})

const currentLyricLine = computed(() => {
    if (lyrics.value) {
        return useLyricParse.syncLyric(lyrics.value, status.currentTime)!
    }
    return 0
})
const currentTimeText = computed(() => {
    return `${formatDuraton(status.currentTime)} / ${formatDuraton(status.duration)}`
})
const sliderValue = computed({
    get() {
        return status.currentTime / status.duration
    },
    set(value) {
        status.currentTime = status.duration * value
    }
})
watch(audio, (nv, ov) => {
    if (audio.value) {
        audio.value.addEventListener('timeupdate', onTimeUpdate)
        audio.value.addEventListener('ended', e => onPlayControl(1))
        audio.value.addEventListener('pause', e => status.isPause = true)
        audio.value.addEventListener('play', e => status.isPause = false)
    }
})
watch(currentMusic, async (nv, ov) => {

    const lrcText = await useConfig.api.musicLyricRequestMethod(currentMusic.value!.id)
    const lrc = useLyricParse.parseLyric(lrcText)
    lyrics.value = lrc
})
watch(currentLyricLine, (nv, ov) => {
    document.querySelector('.lrc.active + li')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
})
function onSwitchMusic(index: number) {
    currentMusic.value = musics.value![index]
    nextTick(() => audio.value?.play())
}
function onTimeUpdate(e: Event) {
    status.currentTime = audio.value!.currentTime;
    status.duration = audio.value!.duration;
}

function onPlayControl(skip: number) {
    if (musics.value && currentMusic.value) {
        const currentIndex = musics.value.findIndex(item => item.id == currentMusic.value!.id)
        const nextIndex = currentIndex + skip;
        const newIndex = nextIndex < 0 ? musics.value.length - 1 : nextIndex > musics.value.length - 1 ? 0 : nextIndex
        onSwitchMusic(newIndex)
    }
}
function onResume(e: Event) {
    audio.value?.play()
}
function onPause(e: Event) {
    audio.value?.pause()
}
function formatDuraton(time: number) {
    return time && time > -1 ?
        `${String(Math.floor(time / 60)).padStart(1, '0')}:${String(Math.floor(time % 60)).padStart(2, '0')}`
        : '0:00';
}

onMounted(async () => {
    const result = await useConfig.api.musicRequestMethod()
    if (result) {
        musics.value = result
        currentMusic.value = result[0]
        // onSwitchMusic(0)
    }
})

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>