<template lang="pug">
//- .content
NDesktop(:apps='apps' :windows="windows" @app-click="onAppClick" @taskbar-click="onTaskbarClick")
    template(v-for="window in windows" :key="window.id")
        Transition
            component(:is="window.view" v-show="!window.status.isMinimize" @close="onWindowClose(window)" @minimize="onWindowMinimize(window)") :title="window.app.title")
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import type { DesktopApp } from '~/components/NDesktop/index.vue';
import type { NWindow } from '~/composables/useAppList';

const apps = useDesktopApps

const windows = shallowRef<NWindow[]>([])
const windowsRef = useTemplateRef<NWindow[]>('windowsRef')
// const activeWindows = computed(() => views.value.map((view: any) => view))

let viewId = 0
function onAppClick({ event, app }: { event: MouseEvent, app: DesktopApp }) {
    const window = app.click(event, app)
    if (window) {
        windows.value.push(window)
        triggerRef(windows)
    }
}
function onTaskbarClick({ event, window }: { event: MouseEvent, window: NWindow }) {
    
    const win = windows.value.find(item => item.id == window.id)
    if (win && win.status) win.status.isMinimize = false
    triggerRef(windows)
}
function onWindowClose(window: NWindow) {
    windows.value.splice(windows.value.findIndex(w => window.id == w.id), 1)
    triggerRef(windows)
}

function onWindowMinimize(window: NWindow) {
    window.status.isMinimize = true    
    triggerRef(windows)
}

</script>

<style lang="scss" scoped></style>