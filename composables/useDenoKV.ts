// import { openKv, Kv } from "@deno/kv";
// let _kv: Kv | undefined = undefined

// import { kv } from "@vercel/kv"

// let _kv = undefined

// const useKv = async () => {
//     if (_kv) return _kv
//     // if (openKv) {
//         return _kv = await openKv()
//     // }
//     // return _kv = await openKv()
//     // if (process.dev) {
//     //     const OpenKV = () => import('@deno/kv')
//     //     const { openKv } = await OpenKV()
//     //     return openKv('kv.db')
//     // }
//     // throw Error('Not Found Database')
// }

// async function clearDatabase() {
//     const kv = await useKv()
//     const entries = []
//     for await (const entry of kv.list({ prefix: [] })) {
//         entries.push(entry)
//     }
//     for await (const item of entries) {
//         const del = await kv.delete(item.key)
//         console.log(del)
//     }
// }