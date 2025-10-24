import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Coursesv2Component } from './coursesv2.component';
import { authGuard } from '../core/guards/auth.guard';
import { CourseDetailsComponent } from './components/course-details/course-details.component';

const routes: Routes = [
  { path: '', component: Coursesv2Component, canActivate: [authGuard]},
  { path: 'course/:id', component: CourseDetailsComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Coursesv2RoutingModule { }
