let zIndex = 0
export function useDragable(eventRef: Ref<HTMLElement | undefined>, targetRef: Ref<HTMLElement | undefined>) {
    let draggable = false
    let x = 0;
    let y = 0;
    let l = 0;
    let t = 0;
    let tran = '';
    function onDrag(eventEl: HTMLElement, targetEl: HTMLElement) {
        //鼠标按下事件
        eventEl.onmousedown = function (e) {
            //获取x坐标和y坐标
            x = e.clientX;
            y = e.clientY;
            //获取左部和顶部的偏移量
            l = targetEl.offsetLeft;
            t = targetEl.offsetTop;
            //开关打开
            draggable = true;
            //设置样式
            // targetEl.style.cursor = "move";
        };
        targetEl.onmousedown = function (e) {
            targetEl.style.zIndex = `${zIndex++}`;
            tran = targetEl.style.transition;
            targetEl.style.transition = 'none';
        };
        //鼠标抬起事件，必须全局监听
        window.addEventListener('mouseup', dragEnd);
        window.addEventListener('mousemove', dragging);
    }
    function dragEnd(e: MouseEvent) {
        //开关关闭
        draggable = false;
        if (targetRef.value) {
            const child = targetRef.value
            // child.style.cursor = 'default';
            // 防止越过父元素
            if (child.parentElement) {
                const parent = child.parentElement;
                const pRect = parent.getBoundingClientRect()
                const cRect = child.getBoundingClientRect()
                if (cRect.left < pRect.left) {
                    child.style.left = '0'
                }
                if (cRect.right > pRect.right) {
                    child.style.left = `${pRect.width - cRect.width}px`
                }
                if (cRect.top < pRect.top) {
                    child.style.top = '0'
                }
                if (cRect.bottom > pRect.bottom) {
                    child.style.top = `${pRect.height - cRect.height}px`
                }
                child.style.opacity = '1';
                child.style.transition = tran;
            }
        }

    }
    function dragging(e: MouseEvent) {
        // const e = targetEl.value!
        if (draggable == false) {
            return;
        }
        if (targetRef.value) {
            const el = targetRef.value
            //获取x和y
            let nx = e.clientX;
            let ny = e.clientY;
            //计算移动后的左偏移量和顶部的偏移量
            let nl = nx - (x - l);
            let nt = ny - (y - t);

            el.style.left = nl + 'px';
            el.style.top = nt + 'px';
            el.style.opacity = '0.8';
        }
    }
    onMounted(() => {
        onDrag(eventRef.value!, targetRef.value || eventRef.value!)
        targetRef.value!.style.zIndex = `${zIndex++}`
    })
    onUnmounted(() => {
        window.removeEventListener('mousemove', dragging)
        window.removeEventListener('mouseup', dragEnd)
    })
}
