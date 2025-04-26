import { useWorkersKV } from "~/composables/useWorkersKV";

const connections: Map<string, any> = new Map()

const kv = useWorkersKV()

export default defineWebSocketHandler({
    async open(peer) {
        console.log("[ws] open", peer);
        connections.set(peer.id, peer)

        const data = await kv.getAllKeys()
        const entries = data.map((entry: any) => JSON.parse(entry.name))
        try {

            entries.sort((a: any, b: any) => {
                const [da, db] = [new Date(a.key[2]),  new Date(b.key[2])]
                return da > db ? 1 : -1
            })
            
        } catch (error) {
            console.error(error);

        }

        peer.send(JSON.stringify({ type: 'init', content: entries }))
        // peer.send(JSON.stringify({ type: 'sys', content: connections.size + ' online!' }))
        // peer.send(peer.id + ' online')

        console.log('[kv] 连接到数据库：成功');
        // console.log('[kv] entries', entries);
        console.log('[kv] 等待下一步操作');
    },

    async message(peer, message) {
        const { ip, message: text } = JSON.parse(message.rawData)

        console.log("[ws] message", peer, message);
        console.log("[ws] ALL CONNECTIONS", connections);
        // peer.send(text);
        const date = new Date().toISOString();
        const username = `#${peer.id}|${ip}`; /*'anonymous'*/
        const data = { key: ['users', username, date, ip], value: { message: text, date: date, user: username, ip } };

        await kv.put(JSON.stringify(data), JSON.stringify(data.value))
        // await WorkersKV.writeKey({ key: JSON.stringify(data), value: JSON.stringify(data.value) })
        // const value = await WorkersKV.readKey({ key: 'aaa' })

        connections.forEach(con => {
            con.send(JSON.stringify({ type: 'msg', content: data }))
        })
    },

    close(peer, event) {
        console.log("[ws] close", peer, event);
        connections.delete(peer.id)
    },

    error(peer, error) {
        console.log("[ws] error", peer, error);
    },
});

