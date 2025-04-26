// import { Base64 } from 'js-base64';
import config from '../config'
import { useFetch } from 'nuxt/app'

const token = config.archives.token
const owner = config.archives.owner
const repository = config.archives.repository

export const useGhFetch = (request: string, opts?: any) => {
    // const TOKEN = `token ${Base64.decode(token)}`
    const TOKEN = `token ${token.join('_')}`
    const BASE_URL = `https://api.github.com/repos/${owner}/${repository}`

    return useFetch(request, { baseURL: BASE_URL, headers: { 'Authorization': TOKEN }, ...opts })
}