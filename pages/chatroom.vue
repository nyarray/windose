<template lang="pug">
.chatroom
    //- .a(v-show="store.messages && store.messages.length")
    .message-flow(v-if="store.messages && store.messages.length")
        .message-item(v-for="(message, i) in store.messages" :key="i" :style="`--msg-color: ${message.color}`")
            .user-info
                //- img(:src="`https://www.gravatar.com/avatar/${encodeURIComponent(message.user + Math.random())}?s=512&d=monsterid`" alt="Avatar")
                .username {{ message.user }}
            .message-text {{ message.message }}
            .message-date {{ useUtils.formatDatetime(message.date) }}
    //- SLoading(v-else)
    .chatbox
        .chatbox-input-wrapper
            input(type="text" placeholder="Type your message..." @keydown.enter="send" v-model="store.message")
        .flex
            button(@click="send") Send
            button(@click="reconnent") Reconnect
            button(@click="clear") Clear
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'blank'
})
let ws: WebSocket | undefined
let ip: string | undefined

interface ChatMessage {
    message: string
    user: string
    date: string
    ip?: string
    color?: string
}
const store = reactive({
    message: "",
    messages: <ChatMessage[]>[],
});

function scroll() {
    nextTick(() => {
        const el = document.querySelector(".message-flow");
        if (el) {
            el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        }
    });
};

function msg(msg: ChatMessage) {
    // console.log(msg, 'MSG');
    const arr = msg.ip?.split('.');
    if (arr && arr.length) {
        const color = arr.map(item => parseInt(item).toString(16)).join('').substring(0, 6)
        // console.log(color);
        msg.color = `#${color}`
    }
    store.messages.push({
        message: msg.message,
        user: `🌍${msg.user}`,
        date: msg.date,
        color: msg.color
    });
    scroll();
}

function sysmsg(...args: string[]) {
    const user = '🛠️[ws]'
    // console.log(user, ...args);
    store.messages.push({
        message: args.join(" "),
        user,
        date: new Date().toISOString(),
    });
    scroll();
};
function registerMessageListener(ws: WebSocket) {

    ws.addEventListener("message", (event) => {
        console.log('<<<');
        if (event.data.startsWith("{")) {
            const data = JSON.parse(event.data)
            // console.log(data);
            if (data.type == 'init') {
                data.content.forEach((entry: any) => {
                    msg(entry.value)
                })
            } else if (data.type == "sys") {
                sysmsg(data.content)
            } else {
                msg(data.content.value)

            }
        }
    });
}

function getSocketUrl() {
    const isSecure = location.protocol === "https:";
    return (isSecure ? "wss://" : "ws://") + location.host + "/_ws";
}

function reconnent() {
    ws = new WebSocket(getSocketUrl());
    registerMessageListener(ws)
}

async function connect() {
    const url = getSocketUrl()
    if (ws) {
        sysmsg("Closing previous connection before reconnecting...");
        ws.close();
        clear();
    }
    sysmsg("Connecting to", url, "...")
    ws = new WebSocket(url);
    registerMessageListener(ws)
    // ws.addEventListener('open', () => {
    //     sysmsg("Connected, Welcome to Windose!");
    // })
    await new Promise((resolve) => ws?.addEventListener("open", resolve));
    sysmsg("Connected, Welcome to Windose!");
};

const clear = () => {
    store.messages.splice(0, store.messages.length);
    sysmsg("previous messages cleared");
};

const send = () => {
    console.log("sending message...");
    console.log(">>> ", store.message)

    if (store.message) {
        if (!ws?.OPEN) {
            reconnent()
        }
        ws?.send(JSON.stringify({ ip, message: store.message }));
    }
    store.message = "";
};

onMounted(() => {

    if (import.meta.client) {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => ip = data.ip)
        connect();
    }
})

</script>

<style lang="scss" scoped>
.chatroom {
    // padding: 16px;
    display: flex;
    flex-direction: column;
    // height: 100%;
    height: 100vh;
    background-color: #f1f1f1;

    .message-flow {
        flex: 1;
        overflow: auto;

        .message-item {

            color: var(--msg-color);

            .user-info {
                display: flex;
            }

            .message-text {
                font-size: 16px;
                margin-left: 16px;
            }

            .message-date {
                font-size: 12px;
                margin-left: 16px;
            }
        }

    }

    .chatbox {
        flex: 0 0 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        .chatbox-input-wrapper {
            flex: 1;
        }

        input {
            display: block;
            width: 100%;
        }
    }
}

img {
    width: 24px;
    filter: brightness(0.8);
    margin-right: 8px;
}

input {
    border: 2px solid grey;
    color: #7953d8;
    padding: 4px;
}

button {
    border: 2px solid grey;
    color: green;
    padding: 4px;

    &:active {
        background-color: grey;
    }
}
</style>
