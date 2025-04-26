class WorkersKV {
    readonly host = 'https://api.cloudflare.com'
    readonly basePath
    readonly config
    readonly headers
    readonly fullPath
    constructor(config: {
        cfAccountId: string,
        cfEmail: string,
        cfAuthKey: string,
        namespaceId: string
    }) {
        this.config = config
        this.headers = {
            'Authorization': 'Bearer ' + this.config.cfAccountId,
            'X-Auth-Email': this.config.cfEmail,
            'X-Auth-Key': this.config.cfAuthKey
        }
        this.basePath = `/client/v4/accounts/${config.cfAccountId}/storage/kv/namespaces/`;
        this.fullPath = `${this.host}${this.basePath}${this.config.namespaceId}`
    }
    async getAllKeys(): Promise<any> {
        const response = await fetch(`${this.fullPath}/keys`,
            { headers: this.headers }
        )
        const json = await response.json()
        return json.result
    }
    async getKey(key: string): Promise<any> {
        const response = await fetch(`${this.fullPath}/values/${encodeURIComponent(key)}`,
            { headers: this.headers }
        )
        const json = await response.json()
        return json
    }
    async put(key: string, value: any): Promise<any> {
        const formData = new FormData();
        formData.append('metadata', value)
        formData.append('value', value)
        const response = await fetch(`${this.fullPath}/values/${encodeURIComponent(key)}`,
            { 
                method: 'PUT',
                headers: this.headers,
                body: formData
            }
        )
        const json = await response.json()
        return json
    }
    // https://api.cloudflare.com/client/v4/accounts/account_id/storage/kv/namespaces/namespace_id/values/key_name
}

// Standard Configuration
// export const useWorkersKV = () => new WorkersKV({
//     cfAccountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
//     cfEmail: process.env.CLOUDFLARE_EMAIL!,
//     cfAuthKey: process.env.CLOUDFLARE_AUTH_KEY!,
//     namespaceId: process.env.NODE_ENV == 'prod' ? process.env.CLOUDFLARE_NAMESPACES! : process.env.CLOUDFLARE_NAMESPACES_DEV!,
// })

// For Deno Depoly
export const useWorkersKV = () => new WorkersKV({
    cfAccountId: '73f266360db938eba304def50b6ebe8a',
    cfEmail: 'tsukiseele@gmail.com',
    cfAuthKey: '5532f7da1e745d338b5bca9d8287724e4afcd',
    namespaceId: process.env.NODE_ENV == 'dev' ? process.env.CLOUDFLARE_NAMESPACES_DEV! : 'b02650e90e744e0083f382d7ab6a39a2',
})