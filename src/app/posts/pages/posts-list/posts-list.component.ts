import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsState } from '../../store/posts.state';
import { loadPosts, showCreatePostForm } from '../../store/posts.actions';
import { Observable } from 'rxjs';
import { IPost } from '../../models/post.model';
import { getPosts, selectIsCreatePostFormVisible } from '../../store/posts.selectors';
import { SharedState } from '../../../shared/store/shared.state';
import { setLoadingSpinner } from '../../../shared/store/shared.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<IPost[]>;
  isCreatePostFormVisible$!: Observable<boolean>;

  constructor(private readonly store: Store<{ posts: PostsState, shared: SharedState }>) {
    this.isCreatePostFormVisible$ = this.store.select(selectIsCreatePostFormVisible);
    this.posts$ = this.store.select(getPosts);
  }

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({ isLoading: true }));
    this.store.dispatch(loadPosts());
  }

  onCreatePostClicked() {
    this.store.dispatch(showCreatePostForm({ status: true }));
  }

  onCloseModal() {
    this.store.dispatch(showCreatePostForm({ status: false }));
  }


}
