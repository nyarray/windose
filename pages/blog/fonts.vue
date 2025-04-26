<template lang="pug">
div
    .font-preview {{ app.title }} 
    .font-preview {{ app.title }} 
    .font-preview {{ app.title }} 
    .font-preview {{ app.title }} 
    .font-preview {{ app.title }} 
    .font-preview {{ app.title }} 
    .font-preview {{ app.title }} 
    .font-preview {{ app.title }} 
    
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'blog'
})

const app = useConfig.app
</script>

<style lang="scss" scoped>
/*
.font-preview {
    font-size: 24px;
    line-height: 32px;
    color: green;
    text-shadow: 2px 2px #002A00;

    &::after {
        color: #ccc;
        text-shadow: 2px 2px #333;
    }

    &:nth-of-type(1) {
        font-family: 'BoutiqueBitmap9x9'; //'fusion-pixel10';//'ChillBitmap', 'BoutiqueBitmap9x9', 'Guanzhi', 'Font01',     ;

        &::after {
            content: ' -- BoutiqueBitmap9x9';
        }
    }

    &:nth-of-type(2) {
        font-family: 'fusion-pixel8-monospaced'; //'BoutiqueBitmap9x9';//'fusion-pixel10';//'ChillBitmap', 'BoutiqueBitmap9x9', 'Guanzhi', 'Font01',     ;


        &::after {
            content: ' -- fusion-pixel8-monospaced';
        }
    }

    &:nth-of-type(3) {
        font-family: 'fusion-pixel8'; //'BoutiqueBitmap9x9';//'fusion-pixel10';//'ChillBitmap', 'BoutiqueBitmap9x9', 'Guanzhi', 'Font01',     ;


        &::after {
            content: ' -- fusion-pixel8';
        }
    }

    &:nth-of-type(4) {
        font-family: 'fusion-pixel10-monospaced'; //'BoutiqueBitmap9x9';//'fusion-pixel10';//'ChillBitmap', 'BoutiqueBitmap9x9', 'Guanzhi', 'Font01',     ;


        &::after {
            content: ' -- fusion-pixel10-monospaced';
        }
    }

    &:nth-of-type(5) {
        font-family: 'ChillBitmap'; //, 'BoutiqueBitmap9x9', 'Guanzhi', 'Font01',     ;

        &::after {
            content: ' -- ChillBitmap';
        }
    }

    &:nth-of-type(6) {
        font-family: 'Guanzhi';

        &::after {
            content: ' -- Guanzhi';
        }
    }

    &:nth-of-type(7) {
        font-family: 'Font01';

        &::after {
            content: ' -- Font01';
        }
    }

    &:nth-of-type(8) {
        font-family: 'DinkieBitmap';

        &::after {
            content: ' -- DinkieBitmap';
        }
    }

}

@font-face {
    font-family: Font01;
    src: url('/01.woff');
}

@font-face {
    font-family: DinkieBitmap;
    src: url('/DinkieBitmap-7pxDemo.woff2');
}


@font-face {
    font-family: fusion-pixel10-monospaced;
    src: url('/fusion-pixel-10px-monospaced-zh_hans.woff2');
}

@font-face {
    font-family: fusion-pixel8-monospaced;
    src: url('/fusion-pixel-8px-monospaced-zh_hans.woff2');
}

@font-face {
    font-family: fusion-pixel8;
    src: url('/fusion-pixel-8px-proportional-zh_hans.woff2');
}

@font-face {
    font-family: ChillBitmap;
    src: url('/ChillBitmap_7px.ttf');
}

@font-face {
    font-family: Guanzhi;
    src: url('/guanzhi-8px.ttf');
}

@font-face {
    font-family: BoutiqueBitmap7x7;
    src: url('/BoutiqueBitmap7x7_1.7.woff2');
}

@font-face {
    font-family: BoutiqueBitmap9x9;
    src: url('/BoutiqueBitmap9x9_1.9.woff2');
}*/
</style>