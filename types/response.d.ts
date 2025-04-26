interface IssueListResponse {
    page: number;
    total_count: number;
    items: IssueResponse[];
}

interface IssueResponse {
    body: string;
    title: string;
    created_at: string;
    labels: string;
    milestone: string;
    number: number;
    total_count: number;
}

interface InspirationResponse {
    date: string;
    created_at: string;
}

interface LabelResponse {
    id: number;
    url: string;
    name: string;
    color: string;
    description: string;
}
