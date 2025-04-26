<template lang="pug">
.n-desktop-background 
    .n-desktop
        .main
            .icons
                .icon(v-for="icon in props.apps" @click="e => onAppClick(e, icon)")
                    img(:src="icon.icon")
                    .icon-title {{icon.title}} 
            slot
        .taskbar 
            NStartMenu(v-model:show="showStartMenu")
            .taskbar-start.hurt-border-inset(@click="onStratBtnClick" :class="{ active: showStartMenu }")
                img.taskbar-start-icon(src="/images/taskbar/button_start_icon.png")
                span Start
            .hurt-divider 
            .taskbar-pin-icon(v-if="currentDatetime")
                img(v-if="neru == 'daytime'" src="/images/icon/icon_desktop_neru_noon.png")
                img(v-else-if="neru == 'evening'" src="/images/icon/icon_desktop_neru_evening.png")
                img(v-else src="/images/icon/icon_desktop_neru_night.png")
            .taskbar-pin-icon
                img(src="/images/icon/icon_desktop_folder_zip.png")
            //- .taskbar-pin-icon 
            .hurt-divider 
            .taskbar-list(v-if="windows")
                .taskbar-list-item.hurt-border-inset(v-for="window in windows" :key="window.id" @click="e => onTaskbarClick(e, window)") 
                    img(:src="window.app.icon")
                    span {{ window.app.title }}
            .taskbar-right-side
                .taskbar-datetime(v-if="currentDatetime")
                    .taskbar-datetime-time {{ currentDatetime.time }}
                    .taskbar-datetime-date {{ currentDatetime.date }} 
        //- component(:is="AboutView")
        //- NDialog
        //- NDialog

    
</template>

<script setup lang="ts">

export interface DesktopApp {
    icon: string,
    title: string,
    key: string,
    click: (e: MouseEvent, app: DesktopApp) => any
    data: any
}
const emit = defineEmits<{
    appClick: [{ event: MouseEvent, app: DesktopApp }]
    taskbarClick: [{ event: MouseEvent, window: NWindow }]
}>()
const props = defineProps<{
    apps: DesktopApp[],
    windows?: NWindow[]
}>()

const showStartMenu = ref(false)
const currentDatetime = ref<{ date: string, time: string }>()
let _timer: NodeJS.Timeout | undefined

const neru = computed(() => {
    if (currentDatetime.value) {
        const hour = parseInt(currentDatetime.value.time.split(':')[0])
        return 6 <= hour && hour < 18 ? 'daytime' : 18 <= hour && hour < 22 ? 'evening' : 'night'

    }
})

function onAppClick(e: MouseEvent, app: DesktopApp) {
    emit('appClick', { event: e, app })
}
function onTaskbarClick(e: MouseEvent, window: NWindow) {
    emit('taskbarClick', {event: e, window})
}

function onStratBtnClick() {
    showStartMenu.value = true
}
function setCurrentDatetime() {
    const datetime = useUtils.formatDatetime(new Date(), 'yyyy-MM-dd|hh:mm').split('|')
    currentDatetime.value = { date: datetime[0], time: datetime[1] }
}

onMounted(() => {
    setCurrentDatetime()
    _timer = setInterval(() => setCurrentDatetime(), 30000);
})

onUnmounted(() => {
    clearInterval(_timer)
})

</script>

<style lang="scss" scoped>
.n-desktop-background {
    position: relative;
    background-color: black;
    // background: url('/images/desktop/bg_side_bar_2.png');
    // background: url('/images/desktop/@marihico.png');
    // background: url('/images/desktop/bg_side_bar_noon2.png');
    // background: url('/images/desktop/FHDbg.png');
    // background-repeat: repeat;
    // background-size: auto 100%;

    // &::before {
    //     content: '';
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     right: 0;
    //     bottom: 0;
    //     // filter: blur(16px);
    //     backdrop-filter: blur(16px) brightness(.5);
    // }
}

.n-desktop {
    --taskbar-height: 56px;
    --border-width: 2.5px;
    // background-color: #f9e2fd;
    max-width: 960px;
    max-height: 100vh;
    position: fixed;
    margin: 0 auto;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    position: relative;
    overflow: hidden;
    // background: #fff repeating-linear-gradient(135deg, rgba($color: #eeaaff, $alpha: 0.5) 0 48px, rgba($color: #bbddff, $alpha: 0.5) 48px 96px);
    background: white;

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        user-select: none;
        pointer-events: none;
        // z-index: -1;
        opacity: 0.5;
    }

    &::before {
        // background-image: url('/images/desktop/bg_side_bar.png');
        background: repeating-linear-gradient(135deg, rgba($color: #eeaaff, $alpha: 0.5) 0 48px, rgba($color: #bbddff, $alpha: 0.5) 48px 112px), repeating-linear-gradient(45deg, rgba(238, 170, 255, 0.5) 0 48px, rgba(187, 221, 255, 0.5) 48px 112px);
        // background:  repeating-linear-gradient(135deg, rgba($color: #eeaaff, $alpha: 0.5) 0 64px, rgba($color: #bbddff, $alpha: 0.5) 64px 144px), repeating-linear-gradient(45deg, rgba(238, 170, 255, 0.5) 0 64px, rgba(187, 221, 255, 0.5) 64px 144px);
        // background:  repeating-linear-gradient(0deg, rgba(245,235,235, 0.5) 0 48px, white 48px 96px) ;
        // background: repeating-linear-gradient(0deg, rgba(238, 170, 255, 0.5) 0 64px, transparent 64px 144px), repeating-linear-gradient(90deg, rgba(238, 170, 255, 0.75) 0 64px, transparent 64px 144px);
        background-repeat: repeat;

        // background-position: right bottom, left top;
        background-position: center;
        background-size: auto 100%;
    }

    &::after {}

    .main {
        position: relative;
        flex: 1;
        height: calc(100vh - var(--taskbar-height));

        .icons {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            flex: 1;
            justify-items: flex-start;
            justify-content: flex-start;
            align-items: flex-start;
            align-content: flex-start;
            height: 100%;

            .icon {
                // flex: 1 1 64px;
                padding: 12px;
                cursor: pointer;
                user-select: none;


                &:hover {
                    filter: brightness(1.2);
                    // filter: grayscale(1);
                    cursor: pointer;
                }

                img {
                    display: block;
                    width: 40px;
                    height: 40px;
                    margin: 0 auto;
                }

                .icon-title {
                    width: 64px;
                    height: 40px;
                    font-size: 14px;
                    line-height: 18px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                    text-align: center;
                    color: #2a00c1;
                }
            }
        }
    }

    .taskbar {
        position: relative;
        display: flex;
        height: var(--taskbar-height);
        padding: 8px;
        // background-color: #f7e0fa;
        background-color: rgba($color: #f7e0fa, $alpha: 0.7);
        border-top: var(--border-width) outset white;
        z-index: 65535;

        .taskbar-start {
            width: 10rem;
            display: flex;
            align-items: center;
            user-select: none;

            span {
                flex: 1;
                text-align: center;
                font-size: 20px;
            }
        }

        .taskbar-pin-icon {
            width: 36px;
            cursor: pointer;

            // border: 1px solid #7953d8;
            img {
                padding: 4px;
                width: 100%;
                height: 100%;
            }
        }

        .taskbar-list {
            flex: 1;
            display: flex;
            flex-direction: row;

            .taskbar-list-item {
                display: flex;
                align-items: center;
                padding: 4px 8px;
                margin-right: 4px;

                img {
                    height: 100%;
                    margin-right: 8px;
                }
            }
        }

        .taskbar-right-side {
            align-self: center;

            .taskbar-datetime {
                display: flex;
                flex-direction: column;
                align-items: center;

                .taskbar-datetime-date {}

                .taskbar-datetime-time {}
            }
        }
    }
}
</style>