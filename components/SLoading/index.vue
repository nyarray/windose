<template lang="pug">
.s-loading {{ currState }}
    //- .s-loadtem
    
</template>

<script setup lang="ts">
const comments = [
    'initialize data...',
    'send network request ...',
    'wait response...'
]
const timer = ref<NodeJS.Timeout>()
const waitSeconds = ref(0)
const maxWatSeconds = 10

const currState = computed(() => {
    if (waitSeconds.value < comments.length) {
        return comments[waitSeconds.value]
    } else if (waitSeconds.value > maxWatSeconds) {
        return 'Error! Please check the console log!'
    } else {
        return comments[comments.length - 1]
    }
})

onMounted(() => {
    timer.value = setInterval(() => {
        waitSeconds.value++
    }, 1000);
})
onUnmounted(() => clearInterval(timer.value))
</script>

<style lang="scss" scoped>
.s-loading {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: green;
    background-color: rgba($color: #000000, $alpha: 0.2);
    padding: 1rem;

    // &::before {

    //     animation: loading 1s linear infinite forwards;
    //     font-size: 2rem;
    //     content: '';

    //     @keyframes loading {

    //         0%,
    //         33% {
    //             content: '·　　';
    //         }

    //         34%,
    //         66% {
    //             content: '　·　';
    //         }

    //         67%,
    //         100% {
    //             content: '　　·';
    //         }
    //     }
    // }
}
</style>