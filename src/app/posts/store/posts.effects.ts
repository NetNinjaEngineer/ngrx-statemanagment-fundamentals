import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "../services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, showCreatePostForm, updatePost, updatePostSuccess } from "./posts.actions";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { PostsState } from "./posts.state";
import { SharedState } from "../../shared/store/shared.state";
import {setErrorMessage, setLoadingSpinner} from "../../shared/store/shared.actions";

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
                        console.log(data);

                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        return loadPostsSuccess({ posts: data })
                    }),
                  catchError((eResponse) => {
                    console.log(eResponse);
                    this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                    return of();
                  })
                )
            })
        )
    });

    createPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postsService.addPost(action.post).pipe(
                    map((data) => {
                        console.log(data);

                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        this.store.dispatch(showCreatePostForm({ status: false }));
                        return addPostSuccess({ post: action.post })
                    }),
                    catchError((eResponse) => {
                        console.log(eResponse);
                      this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                      this.store.dispatch( setErrorMessage({ message: eResponse.message }) );
                      this.store.dispatch(showCreatePostForm({ status: false }));
                      return of();
                    })
                )
            })
        )
    });

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            exhaustMap((action) => {
                console.log(action);

                return this.postsService.updatePost(action.id, action.data).pipe(
                    map((result) => {
                        console.log(result);
                        return updatePostSuccess({ post: result}); // TODO: need testing
                    }),
                  catchError((eResponse) => {
                    console.log(eResponse);
                    this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                    return of();
                  })
                )
            })
        )
    });


    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            exhaustMap((action) => {
                return this.postsService.deletePost(action.id).pipe(
                    map((response) => {
                        return deletePostSuccess({ postId: action.id });
                    }),
                    catchError((eResponse) => {
                        console.log(eResponse);
                      this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                      return of();
                    })
                )
            })
        )
    });

}
