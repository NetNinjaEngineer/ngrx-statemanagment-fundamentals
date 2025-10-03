export interface IPost {
    body: string
    id?: string
    reactions: Reactions
    tags: string[]
    title: string
    userId: number
    views: number
}

export interface Reactions {
    dislikes: number
    likes: number
}
