import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./posts.state";

export const postsFeatureKey = "posts";

const selectPostsState = createFeatureSelector<PostsState>(postsFeatureKey);

export const getPosts = createSelector(selectPostsState, state => state.posts);

export const selectIsCreatePostFormVisible = createSelector(
    selectPostsState,
    state => state.showCreatePostForm
);
