import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Coursesv2RoutingModule } from './coursesv2-routing.module';
import { Coursesv2Component } from './coursesv2.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesV2Effects } from './store/coursesv2.effects';
import { coursesV2Reducer } from './store/coursesv2.reducer';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CreateCourseButtonComponent } from './components/create-course-button/create-course-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseDetailsComponent } from './components/course-details/course-details.component';


@NgModule({
  declarations: [
    Coursesv2Component,
    CreateCourseComponent,
    CreateCourseButtonComponent,
    CourseDetailsComponent
  ],
  imports: [
    SharedModule,
    Coursesv2RoutingModule,
    StoreModule.forFeature('coursesv2', coursesV2Reducer),
    EffectsModule.forFeature([CoursesV2Effects]),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class Coursesv2Module { }
