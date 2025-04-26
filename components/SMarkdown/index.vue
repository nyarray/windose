<template lang="pug">
.markdown-preview
    .markdown-title(v-if='title') {{ title }}
    .markdown-content(v-html='markdown' ref='contentRef')
    transition(name='zoom')
        .markdown-image-preview-modal(v-if='previewEl', @click='cancelPreview')
    //- img.markdown-image-preview(v-if='preview', :src='preview', ref='preview')
</template>

<script lang="ts" setup>
const props = defineProps<{
    title?: string,
    content: string,
    offset?: number,
}>()

let _timer: NodeJS.Timeout | undefined
let preview: string | undefined
let previewEl: HTMLElement | undefined
let titles: string[] | undefined

// const emit = defineEmits<{
//   (e: 'loaded', html: HtmlMarkdown): void
//   (e: 'activeChange', value: {index: number, item: Element | undefined}): void
// }>()
const emit = defineEmits<{
    loaded: [html: HtmlMarkdown]
    activeChange: [value: { index: number, item: Element | undefined }]
}>()

// watch(props.content, (nv, ov) => {

// })
const markdown = computed(() => {
    try {
        const result = useMarkdown(props.content)
        emit('loaded', result)
        titles = result.titles
        return result.html
    } catch (error) {
        console.error(error)
    }
    return null
})

function getNavPosition() {
    const titles = document.querySelectorAll(".markdown [id^='md-title']")
    if (!titles.length) return
    let title, i
    for (i = 0; i < titles.length; i++) {
        title = titles[i]
        const rect = title.getBoundingClientRect()
        const offset = props.offset || 0;
        if (rect.top - rect.height > offset) break
    }
    emit('activeChange', { index: i - 1, item: title })
}
function onScroll() {
    if (_timer) return
    _timer = setTimeout(() => {
        getNavPosition()
        cancelPreview()
        _timer = undefined
    }, 200)
}
function cancelPreview() {
    if (previewEl) {
        previewEl.style.transform = 'none'
        previewEl.style.zIndex = '0'
        previewEl = undefined
    }
}
function openPreview(imgEl: HTMLElement) {
    if (imgEl) {
        previewEl = imgEl
        const elRect = previewEl.getBoundingClientRect()
        const targetTop = (window.innerHeight - elRect.height) / 2
        const targetLeft = (window.innerWidth - elRect.width) / 2
        const scale = elRect.width / elRect.height > window.innerWidth / window.innerHeight ? window.innerWidth / elRect.width : window.innerHeight / elRect.height
        previewEl.style.transform = `translate(${targetLeft - elRect.left}px, ${targetTop - elRect.top}px) scale(${scale})`
        previewEl.style.zIndex = '16'
    }
}
function initCopy() {
    document
        .querySelectorAll('.markdown-content .code-options [data-copy]')
        .forEach((el) => 
            el.addEventListener('click', (e) => 
                navigator.clipboard.writeText(document.getElementById(el.getAttribute('data-copy')!)!.textContent!)))
}
function initPreview() {
    document
        .querySelectorAll('.markdown-content img')
        .forEach((imgEl) => 
            imgEl.addEventListener('click', (e) => 
                nextTick(() => 
                    (previewEl ? cancelPreview() : openPreview(e.target as HTMLElement)))))
}

onMounted(() => {
    setTimeout(() => {
        initCopy()
        initPreview()
        window.addEventListener('scroll', onScroll)
    }, 500)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
})
</script>
<style lang="scss" scoped>
.markdown-image-preview {
    position: fixed;
    opacity: 0;
}
</style>

<style lang="scss">
// @import "highlight.js/styles/atom-one-dark.css";
@import 'highlight.js/styles/stackoverflow-light.css';

@import './index.scss';
// @import './hsl.scss';
@import './theme/mono.scss';

// @import './theme/hsl.scss';
/*
:root[theme="dark"] {
  @import "./theme/dark.scss";
}*/
</style>
