interface Post {
    markdown: string;
    title: string;
    description: string;
    createdAt: string;
    labels: string;
    category: string;
    id: number;
    cover: MarkdownImage;
    nav: Nav[];
}

interface Category {
    description: string;
    summary: string;
    cover: string;
}
interface Nav {
    level: number;
    id: string;
    title: string;
}

interface MarkdownImage {
    title?: string;
    url?: string;
}

type Page = Record<string, string>;

type Timeline = Record<string, Post[]>;

type Projects = { name: string; items: Page[] }[];
