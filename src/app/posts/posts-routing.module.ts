import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './pages/posts-list/posts-list.component';

const routes: Routes = [
  { path: '', component: PostsListComponent, title: 'posts' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
