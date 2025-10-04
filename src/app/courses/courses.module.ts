import { NgModule } from '@angular/core';
import { CoursesRoutingModule } from './courses-routing.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './pages/courses/courses.component';
import { CreateCourseModalComponent } from './components/create-course-modal/create-course-modal.component';
import { CreateCourseButtonComponent } from './components/create-course-button/create-course-button.component';
import { SearchCoursesComponent } from './components/search-courses/search-courses.component';
import { CourseFilterComponent } from './components/course-filter/course-filter.component';
import { coursesReducer } from './store/courses.reducers';
import { SharedModule } from '../shared/shared.module';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';


@NgModule({
  declarations: [
    CourseFilterComponent,
    SearchCoursesComponent,
    CreateCourseButtonComponent,
    CreateCourseModalComponent,
    CoursesComponent,
    CourseDetailsComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    StoreModule.forFeature('courses', coursesReducer),
  ],
  exports: []
})
export class CoursesModule { }
