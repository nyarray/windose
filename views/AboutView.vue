<template lang="pug">
NWindow#about(width="50%", height="60%")
    .content 
        ul
            li 
                span 开放源代码协议
                span MIT License
            li 
                span 构建
                br
                a(href="https://nuxt.com/" target="_blank") Nuxt - 3.13+
            li
                span 驱动
                br
                a(href="https://deno.com/deploy" target="_blank") Deno Deploy
            li 
                span 项目别名
                span HURT
            li 
                span 实例
                span 无服务器函数(FaaS)/服务器端渲染(SSR)
            li
                span 致谢 (排名不分先后)
                br
                a(href="https://github.com/denoland/deno" target="_blank") Deno
                a(href="https://www.cloudflare.com/" target="_blank") Cloudflare
                a(href="https://github.com/cure53/DOMPurify" target="_blank") dompurify
                a(href="https://github.com/highlightjs/highlight.js" target="_blank") highlight.js
                a(href="https://github.com/KaTeX/KaTeX" target="_blank") katex
                a(href="https://github.com/markedjs/marked" target="_blank") marked
                a(href="https://github.com/nuxt/nuxt" target="_blank") Nuxt
                a(href="https://github.com/pugjs/pug" target="_blank") pug
                a(href="https://github.com/sass/sass" target="_blank") sass
                a(href="https://github.com/vuejs" target="_blank") vue
        //- ul
            //- li(v-for="[k, v] in Object.entries(about)") {{ k }} : {{ v }}
</template>

<script setup lang="ts">
// const about: Record<string, string> = {
// }

</script>

<style lang="scss" scoped>
#about {
    .content {
        padding: 1rem;
        li {
            padding-bottom: .5rem;
            span{
                display: block;
                margin-left: 2rem;
            }
            span:nth-of-type(1)  {
                
                display: inline;
                margin-left: 0;
            }
        }
        a {
            // display: block;
            display: inline-block;
            margin-left: 2rem;
        }
    }
    a{
        color: green;
    }
    // position: fixed;
    
    // left: 50%;
    // top: 50%;
    // width: 333px;
    // height: 333px;
    // background: red;
}

</style>