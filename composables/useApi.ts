import { useGhFetch } from "@/composables/useGhFetch"

const owner = useConfig.archives.owner
const repository = useConfig.archives.repository

export default {
    async fetchPosts({ page = 1, count = 10 }): Promise<IssueListResponse> {
        const { data } = await useGhFetch(`https://api.github.com/search/issues?q=repo:${owner}/${repository}+type:issue+state:open&page=${page}&per_page=${count}`)
        return data.value as IssueListResponse
    },
    async fetchArchiveById(id: number): Promise<IssueResponse> {
        const { data } = await useGhFetch(`/issues/${id}?state=open`)
        return data.value as IssueResponse
    },
    async fetchLabels(): Promise<LabelResponse[]> {
        const { data } = await useGhFetch(`/labels`)
        return data.value as LabelResponse[]
    },
    async fetchMilestones(): Promise<IssueListResponse> {
        const { data } = await useGhFetch(`/milestones`)
        return data.value as IssueListResponse
    },
    async fetchPage(type = ''): Promise<IssueResponse[]> {
        const upperType = type.replace(/^\S/, s => s.toUpperCase())
        const { data } = await useGhFetch(`/issues?state=closed&labels=${upperType}`)
        return data.value as IssueResponse[]
    },
    async fetchInspiration({ page = 1, count = 10 }): Promise<InspirationResponse[]> {
        const { data } = await useGhFetch(`/issues?state=closed&labels=inspiration&page=${page}&per_page=${count}`)
        return data.value as InspirationResponse[]
    }
}
