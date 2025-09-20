import { createReducer, on } from "@ngrx/store";
import { initialState } from "./posts.state";
import { addPostSuccess, loadPostsSuccess, showCreatePostForm } from "./posts.actions";

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
    })
); 