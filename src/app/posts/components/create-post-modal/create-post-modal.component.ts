import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IPost } from '../../models/post.model';
import { Store } from '@ngrx/store';
import { PostsState } from '../../store/posts.state';
import { addPost, showCreatePostForm, updatePost } from '../../store/posts.actions';
import { SharedState } from '../../../shared/store/shared.state';
import { setLoadingSpinner } from '../../../shared/store/shared.actions';
import { selectEditMode, selectSelectedPost } from '../../store/posts.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrl: './create-post-modal.component.css'
})
export class CreatePostModalComponent implements OnInit, OnDestroy {

  @Output() onCloseModalBtnClicked = new EventEmitter<void>();

  postForm!: FormGroup;

  isEditMode!: boolean;
  selectedPost!: IPost | null;
  selectedPostSubscription!: Subscription;


  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<{ posts: PostsState, shared: SharedState }>) {
        this.postForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      userId: new FormControl(0, [Validators.required]),

      views: new FormControl(0, [Validators.min(0)]),

      reactions: this.fb.group({
        likes: new FormControl(0, [Validators.min(0)]),
        dislikes: new FormControl(0, [Validators.min(0)])
      })
    })
  }

  ngOnInit(): void {

    this.store.select(selectEditMode).subscribe((status) => {
      this.isEditMode = status;
    });

    this.selectedPostSubscription = this.store.select(selectSelectedPost).subscribe((post) => {
      this.selectedPost = post;
      if (this.isEditMode && this.selectedPost) {
        this.postForm.patchValue(this.selectedPost);
      } else {
        this.postForm.reset();
      }
    });

  }

  ngOnDestroy(): void {
    this.selectedPostSubscription.unsubscribe();
  }


  onCloseModalClicked() {
    this.onCloseModalBtnClicked.emit();
  }

  onSubmit() {
    if (this.postForm.valid) {

      if (!this.isEditMode) {
        const post: IPost = {
          title: this.postForm.value.title,
          body: this.postForm.value.body,
          tags: this.postForm.value.tags.split(','),
          userId: this.postForm.value.userId,
          views: this.postForm.value.views,
          reactions: this.postForm.value.reactions
        }

        this.store.dispatch(setLoadingSpinner({ isLoading: true }));

        this.store.dispatch(addPost({ post }));
      }
      else {
        if (this.selectedPost?.id) {
          const updatedPost: IPost = { ...this.selectedPost, ...this.postForm.value } as IPost;

          this.store.dispatch(updatePost({ id: this.selectedPost.id, data: updatedPost }));
          this.store.dispatch(showCreatePostForm({ status: false }));
        }
      }

    }
  }

}
