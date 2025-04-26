<template lang="pug">
.n-window(ref='dragTarget' :class="{ maximize: store.isMaximize }" :style="{ '--width': width, '--height': height }")
    .n-window-menu(ref='dragEvent')
        .n-window-menu-title {{ title }}
        .n-window-menu-options 
            .options-minimize(@mousedown.stop="onMinimize() | emit('minimize')")
                img(src="/public/images/ui/button_minimize.png" draggable="false")
            .options-maximize(@mousedown.stop="onMaximize() | emit('maximize')")
                img(src="/public/images/ui/button_maximize.png" draggable="false")
            .options-close(@mousedown.stop="emit('close')")
                img(src="/public/images/ui/button_close.png" draggable="false")
    .n-window-content 
        slot
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    title?: string,
    width?: string,
    height?: string
}>(), {
    title: '',
    width: '400px',
    height: '300px'
})
const emit = defineEmits<{
    minimize: []
    maximize: []
    close: []
}>()

const store = reactive({
    isMaximize: false,
    beforeRect: { x: 0, y: 0 }
})
const dragEvent = ref<HTMLElement | undefined>()
const dragTarget = ref<HTMLElement | undefined>()

useDragable(dragEvent, dragTarget)

function onMinimize() { }

function onMaximize() {
    if (dragTarget.value && dragTarget.value.parentElement) {
        if (store.isMaximize) {
            store.isMaximize = false
            const pRect = dragTarget.value.parentElement.getBoundingClientRect()
            dragTarget.value.style.left = `${store.beforeRect.x - pRect.x}px`
            dragTarget.value.style.top = `${store.beforeRect.y - pRect.y}px`
        } else {
            store.isMaximize = true
            store.beforeRect = dragTarget.value.getBoundingClientRect()!
            dragTarget.value.style.left = '0'
            dragTarget.value.style.top = '0'
        }

    }
}

// dragEvent.value!.click();

</script>

<style lang="scss" scoped>
.n-window {
    position: absolute;
    left: 20%;
    top: 20%;
    border: 2px outset #7953d8;
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 8px hsla(0, 0%, 0%, .12);
    transition: .2s cubic-bezier(0.075, 0.82, 0.165, 1);
    width: var(--width);
    height: var(--height);

    &.maximize {
        width: 100% !important;
        height: 100% !important;
        left: 0;
        top: 0;
    }

    .n-window-menu {
        display: flex;
        --menu-height: 32px;
        // flex: 0 0 32px;
        height: var(--menu-height);
        border: 2px solid #7953d8;
        // margin: 2px;
        // background-color: #6d3eff;
        background-color: #fcfcfc;
        user-select: none;
        cursor: pointer;

        .n-window-menu-title {
            flex: 1;
            padding-left: 10px;
        }

        .n-window-menu-options {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
            flex-direction: row;

            .options-maximize,
            .options-minimize,
            .options-close {
                cursor: pointer;
                user-select: none;

                &:hover {
                    filter: brightness(2);
                }

                img {
                    display: block;
                    height: 100%;
                    // width: calc(var(--menu-height) - 8px);
                    // height: calc(var(--menu-height) - 8px);
                    margin-right: 2px;
                    padding: 2px 1px;
                }
            }
        }
    }

    .n-window-content {
        flex: 1;
        overflow: auto;
    }
}
</style>