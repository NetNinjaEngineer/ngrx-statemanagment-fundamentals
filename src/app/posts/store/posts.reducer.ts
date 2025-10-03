import { createReducer, on } from "@ngrx/store";
import { initialState } from "./posts.state";
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, setEditMode, setSelectedPost, showCreatePostForm, updatePostSuccess } from "./posts.actions";

export const postsReducer = createReducer(
    initialState,
    on(loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    }),
    on(showCreatePostForm, (state, action) => {
        return {
            ...state,
            showCreatePostForm: action.status
        }
    }),
    on(addPostSuccess, (state, action) => {
        return {
            ...state,
            posts: [...state.posts, action.post]
        }
    }),
    on(deletePostSuccess, (state, { postId }) => {
        const updatedPosts = state.posts.filter(p => p.id !== postId);
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(setEditMode, (state, { status }) => {
        return {
            ...state,
            isEditMode: status
        }
    }),
    on(setSelectedPost, (state, { post }) => {
        return {
            ...state,
            selectedPost: post
        }
    }),
    on(updatePostSuccess, (state, action) => {
        const updatedPosts = state.posts.map(post => {
            if (post.id === action.post.id)
                return action.post;
            else
                return post;
        });

        return {
            ...state,
            posts: updatedPosts
        }
    })
); 