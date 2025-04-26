<template lang="pug">
.home
    .title {{ useConfig.app.title }} 
    .content 这里是某树状图设计者在遥远虚拟世界的存档，除了部分技术和项目文档，还包含个人主观意识以及对超自我意识的想法。无关任何人的喜好，既不会有迎合大众的东西，更不会满足任何人的期待。
    //- .content 我喜欢入间人间的轻小说作品和鍵空とみやき的HSL。
    .content 如果你迷路了，请马上离开这里，这里不欢迎正常人，请收起你的好奇心。

    .content 碎碎念
    .content 夜ノみつき的画有种独特的魅力，简直是可爱与神秘感的完美结合
    .content かにビーム，我最喜欢的画师，萌，灵动，エロ的日常，百合更是深得我心。
    
    //- .content 如果你很好奇，那么很抱歉，前面的提醒并非勾起你的好奇心。
    //- .content 一切反直觉内容已隐藏，


</template>

<script setup lang="ts">

definePageMeta({
  layout: 'blog'
})
</script>

<style lang="scss" scoped>
.title {
    font-size: 1.5rem;
    text-decoration: underline;
}
.content {
  /* position: relative; */
  margin-top: 1rem;
  /* padding: 1rem; */
  /* &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
  } */
}
</style>