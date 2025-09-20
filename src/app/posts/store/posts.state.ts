import { IPost } from "../models/post.model";

export interface PostsState {
    posts: IPost[],
    showCreatePostForm: boolean
}

export const initialState: PostsState = {
    posts: [],
    showCreatePostForm: false
}