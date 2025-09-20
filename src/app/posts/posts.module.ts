import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './pages/posts-list/posts-list.component';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './store/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/posts.effects';
import { CreatePostButtonComponent } from './components/create-post-button/create-post-button.component';
import { CreatePostModalComponent } from './components/create-post-modal/create-post-modal.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    PostsListComponent,
    CreatePostButtonComponent,
    CreatePostModalComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    StoreModule.forFeature('posts', postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    FormsModule,
    ReactiveFormsModule
]
})
export class PostsModule { }
