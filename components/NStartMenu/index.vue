<template lang="pug">
.n-start-menu.hurt-border(v-if="show" ref="menu")
    .menu-aside-title Sweet Hurt
    ul.menu
        li.menu-item(v-for="app in apps" :key="app.id" @click="e => app.click(e, app)")
            img.menu-item-icon(:src="app.icon")
            .menu-item-title {{ app.title }}
    
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

const show = defineModel<boolean>('show')
const menu = useTemplateRef<HTMLElement>('menu')
const apps = [...useDesktopApps].splice(0, 5)

// 点击组件外的区域自动关闭
function handleClose(e: Event) {
    if (show.value && menu.value) {
        if (!menu.value.contains(e.target as HTMLElement)) {
            show.value = false
        }
    }
}
watch(show, (nv, ov) => {
    window.removeEventListener('click', handleClose)
    setTimeout(() => {
        window.addEventListener('click', handleClose)
    }, 0);
})

onUnmounted(() => {
    window.removeEventListener('click', handleClose)
})

</script>

<style lang="scss" scoped>
// @mixin border {
//     border-top: var(--border-width) outset white;
// }
.n-start-menu {
    --primary-color: rgb(0, 0, 127);
    position: absolute;
    left: 0;
    bottom: 100%;
    background-color: #f0f0f0;
    width: 256px;
    display: flex;

    // @include border-outset;
    .menu-aside-title {
        width: 32px;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-size: 1.5rem;
        color: #f0f0f0;
        line-height: 32px;
        padding: .5rem 0;
        background: linear-gradient(0deg, var(--primary-color) 0%, rgb(63, 63, 127) 100%);
    }

    .menu {
        // display: flex;
        // flex-direction: column;
        width: 100%;
        background-color: #eee;

        .menu-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 .5rem;
            width: 100%;
            cursor: pointer;
            height: 48px;

            &:hover {
                color: #f0f0f0;
                background-color: var(--primary-color);
            }

            .menu-item-icon {
                height: 32px;
            }

            .menu-item-title {
                font-size: 1rem;
                margin-left: 1rem;
            }
        }
    }
}
</style>