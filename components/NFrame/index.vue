<template lang="pug">
iframe(:src="src")
</template>

<script setup lang="ts">
const props = defineProps<{
    src: string
}>()
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: 100%;
}
</style>