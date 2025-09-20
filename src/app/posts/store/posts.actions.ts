import { createAction, props } from "@ngrx/store";
import { IPost } from "../models/post.model";

export const LOAD_POSTS = '[posts page] load posts';

export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';

export const SHOW_CREATE_POST_FORM = '[posts page] show create post form';

export const ADD_POST = '[posts page] add post';

export const ADD_POST_SUCCESS = '[posts page] add post success';



export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts: IPost[] }>());
export const showCreatePostForm = createAction(SHOW_CREATE_POST_FORM, props<{status: boolean}>());
export const addPost = createAction(ADD_POST, props<{post: IPost}>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{post: IPost}>());
