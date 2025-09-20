import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IPost } from '../../models/post.model';
import { Store } from '@ngrx/store';
import { PostsState } from '../../store/posts.state';
import { addPost } from '../../store/posts.actions';
import { SharedState } from '../../../shared/store/shared.state';
import { setLoadingSpinner } from '../../../shared/store/shared.actions';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrl: './create-post-modal.component.css'
})
export class CreatePostModalComponent implements OnInit {

  @Output() onCloseModalBtnClicked = new EventEmitter<void>();

  postForm!: FormGroup;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: Store<{ posts: PostsState, shared: SharedState }>) { }

  ngOnInit(): void {
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


  onCloseModalClicked() {
    this.onCloseModalBtnClicked.emit();
  }

  onSubmit() {
    if (this.postForm.valid) {
      const post: IPost = {
        id: 0,
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
  }

}
