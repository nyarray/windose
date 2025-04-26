<template lang="pug">
i.s-icon(:data-name="name") 
    
</template>

<script setup lang="ts">

const props = defineProps<{
    name: string
}>()
</script>

<style lang="scss" scoped>
.s-icon {
    min-width: 1rem;
    min-height: 1rem;
    background-color: hsla(0, 0%, 0%, .25);
    margin: .25rem;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: black;
        width: .25rem;
        height: .25rem;
    }
    &::before {
        content: attr(data-name);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        color: inherit;
        font-size: .8rem;
        background-color: #fff;
        border-radius: .5rem;
        box-shadow: 0 0 .5rem hsla(0, 0%, 0%, .25);
        z-index: 999;
        padding: 0 .25rem;  
    }
    &:hover {
        &::before {
            display: block;
        }
    }
    
}
</style>