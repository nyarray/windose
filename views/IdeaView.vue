<template lang="pug">
NWindow(width="50%", height="60%")
    .container 
    .title 忘却的彼岸
    ul.idea-list
        li.idea(v-for="idea in ideas")
            .idea-content {{ idea.content }}
            .idea-date
        
    
</template>

<script setup lang="ts">
const ideas = ref([
])
</script>

<style lang="scss" scoped>
.title {
    padding-bottom: 100%;
}
</style>