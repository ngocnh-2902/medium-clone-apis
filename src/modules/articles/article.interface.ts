export interface IArticle {
    id: number;
    authorId: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: string;
    publishedAt: Date;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}