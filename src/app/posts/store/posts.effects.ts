import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "../services/posts.service";
import { addPost, addPostSuccess, loadPosts, loadPostsSuccess, showCreatePostForm } from "./posts.actions";
import { exhaustMap, map, mergeMap } from "rxjs";
import { Store } from "@ngrx/store";
import { PostsState } from "./posts.state";
import { SharedState } from "../../shared/store/shared.state";
import { setLoadingSpinner } from "../../shared/store/shared.actions";
import { IPost } from "../models/post.model";

@Injectable()
export class PostsEffects {
    actions$ = inject(Actions);
    postsService = inject(PostsService);
    store = inject(Store<{ shared: SharedState, posts: PostsState }>);

    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            exhaustMap(() => {
                return this.postsService.getPosts().pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        return loadPostsSuccess({ posts: data })
                    })
                )
            })
        )
    });

    createPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postsService.getPosts().pipe(
                    mergeMap((posts) => {
                        const newId = posts.length > 0
                            ? Math.max(...posts.map(p => p.id)) + 1 : 1;

                        const newPost = { ...action.post, id: newId } as IPost;

                        return this.postsService.addPost(newPost).pipe(
                            map((data) => {
                                this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                                return addPostSuccess({ post: newPost })
                            })
                        )

                    })
                )
            })
        )
    });

}