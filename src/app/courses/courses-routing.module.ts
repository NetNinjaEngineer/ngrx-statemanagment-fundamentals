import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CoursesV2Component } from './pages/courses-v2/courses-v2.component';

const routes: Routes = [
  { path: '', component: CoursesComponent, title: 'Courses' },
  { path: 'v2', component: CoursesV2Component, title: 'CoursesV2' },
  { path: ':id', component: CourseDetailsComponent, title: 'Details' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
