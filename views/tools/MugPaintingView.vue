<template lang="pug">
    NWindow#video-view(width="70%", height="80%")
        .mug-painting-title 马克杯绘生成
        .mug-painting(ref="mug" :style="colorsCssVars" )
            .painting-wrap(:style="{'--bgColor' : 'white'}")
                .painting-before
                    img(v-if="beforeImage" :src="beforeImage")
                .painting-after
        input(type="file" accept="image/*" @change="onImageSelect")
        .color(v-for="color in colors" :style="`background-color: ${color.hex};`") 
        .options-save(@click="onSaveAs") 保存 
</template>

<script setup lang="ts">
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useTemplateRef } from 'vue';
import { extractColors } from "extract-colors";
import type { FinalColor } from 'extract-colors/lib/types/Color';

const mug = useTemplateRef<HTMLElement>('mug')
const imageFile = ref<File>()
const beforeImage = ref<string>()
const colors = ref<FinalColor[]>()

watch(imageFile, async (nv) => {
    // console.log(nv);
    beforeImage.value = URL.createObjectURL(imageFile.value!)
    colors.value = await extractColors(beforeImage.value);//.then(console.log).catch(console.error);
    console.log(colors);
})
const colorsCssVars = computed(() => {
    if (colors.value) {
        return colors.value.map((item, i) => {
            return `--color-${i}: ${item.hex}`
        }).join(';')
    }
    return ''
})
// Function to download data to a file
function download(blob: Blob, filename: string) {
    const file = blob;

    const a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
function onImageSelect(e: InputEvent) {
    const files = (e.target as HTMLInputElement).files
    if (files && files.length) {
        imageFile.value = files[0]
    }

}

function onSaveAs() {
    toBlob(mug.value!, { canvasWidth: 2000, canvasHeight: 850 })
        .then(function (blob) {
            download(blob!, `mag_${Date.now()}.png`)
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
}
</script>

<style lang="scss" scoped>
.mug-painting {
    --afterLineColor: rgba(0, 0, 0, .25);
    --afterLineWidth: 12%;
    --afterVPadding: 12%;

    border: 2px solid purple;
    background-color: var(--bgColor);

    .painting-wrap {
        position: relative;
        width: 100%;
        aspect-ratio: 40 / 17;

        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #000;
        }

        .painting-before,
        .painting-after {
            position: absolute;
            top: 0;
            bottom: 0;
        }

        .painting-before {
            left: 0;
            right: 50%;

            &::before {}

            // background-color: red;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                mask-image: linear-gradient(transparent, black, transparent);
            }
        }

        .painting-after {
            left: 50%;
            right: 0;
            background:
                repeating-linear-gradient(0deg,
                    transparent 10px,
                    var(--color-0) 10px 20px,
                    transparent 20px 30px),
                repeating-linear-gradient(90deg,
                    transparent 10px,
                    var(--color-1) 10px 20px,
                    transparent 20px 30px);

            &::before {
                content: '';
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                position: absolute;
                background:
                    linear-gradient(0,
                        transparent 12%,
                        var(--afterLineColor) var(--afterVPadding) calc(var(--afterVPadding) + var(--afterLineWidth)),
                        transparent calc(var(--afterVPadding) + var(--afterLineWidth)) calc(100% - var(--afterVPadding) - var(--afterLineWidth)),
                        var(--afterLineColor) calc(100% - var(--afterVPadding) - var(--afterLineWidth)) calc(100% - var(--afterVPadding)),
                        transparent calc(100% - var(--afterVPadding))),
            }

            // background-color: green;
        }
    }

}
.color {
    width: 16px;
    height: 16px;
}
.options-save {
    display: inline-block;
    border: 2px solid green;
    padding: 2px 4px;
    cursor: pointer;
    user-select: none;

    &:active {
        filter: brightness(1.5);
    }
}
</style>