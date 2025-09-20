export interface IPost {
    body: string
    id: number
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
