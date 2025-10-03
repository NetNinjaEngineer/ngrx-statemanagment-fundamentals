import { IPost } from "../models/post.model";

export interface PostsState {
    posts: IPost[],
    showCreatePostForm: boolean,
    isEditMode: boolean,
    selectedPost: IPost | null
}

export const initialState: PostsState = {
    posts: [],
    showCreatePostForm: false,
    isEditMode: false,
    selectedPost: null
}