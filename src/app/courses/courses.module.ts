import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './pages/courses/courses.component';
import { CreateCourseModalComponent } from './components/create-course-modal/create-course-modal.component';
import { CreateCourseButtonComponent } from './components/create-course-button/create-course-button.component';
import { SearchCoursesComponent } from './components/search-courses/search-courses.component';
import { CourseFilterComponent } from './components/course-filter/course-filter.component';
import { coursesReducer } from './store/courses.reducers';


@NgModule({
  declarations: [
    CourseFilterComponent,
    SearchCoursesComponent,
    CreateCourseButtonComponent,
    CreateCourseModalComponent,
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    StoreModule.forFeature('courses', coursesReducer),
  ],
  exports: []
})
export class CoursesModule { }
