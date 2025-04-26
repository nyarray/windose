// deno repl --unstable
const kv = await Deno.openKv("https://api.deno.com/databases/0d266082-09f9-4b2f-8ca6-f233f36a17ff/connect");
// const all = await kv.list({prefix: []})

const entries = []
for await (const entry of kv.list({ prefix: [] })) {
    entries.push(entry)
}
for await (const item of entries) {
    
    const del = await kv.delete(item.key)
    console.log(del)
}