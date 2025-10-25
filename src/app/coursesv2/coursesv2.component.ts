import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesV2State } from './store/coursesv2.state';
import { Observable } from 'rxjs';
import { ICourseV2 } from './models/courseV2.model';
import { getCourses, getIsCreateCourseFormVisiable } from './store/coursesv2.selectors';
import { deleteCourse, loadCourses, setCreateCourseFormVisiable, setEditMode, setSelectedCourseToEdit } from './store/coursesv2.actions';
import { SharedState } from '../shared/store/shared.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coursesv2',
  standalone: false,
  templateUrl: './coursesv2.component.html',
  styleUrl: './coursesv2.component.css'
})
export class Coursesv2Component implements OnInit {

  courses$!: Observable<ICourseV2[]>;
  isCreateCourseFormVisible$!: Observable<boolean>;

  constructor(private readonly store: Store<{ coursesv2: CoursesV2State, shared: SharedState }>,
    private readonly router: Router
  ) {
    this.courses$ = this.store.select(getCourses);
    this.isCreateCourseFormVisible$ = this.store.select(getIsCreateCourseFormVisiable);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }
  
  onEditCourse(courseToEdit: ICourseV2) {
    // this.store.dispatch(setEditMode({ isEditMode: true }));
    // this.store.dispatch(setSelectedCourseToEdit({ course: courseToEdit }));
    this.router.navigateByUrl(`/coursesv2?id=${courseToEdit.id}&edit=true`);
    this.store.dispatch(setCreateCourseFormVisiable({ status: true }));
  }
  onDeleteCourse(courseId: string | undefined) {
    if (courseId) {
      if (confirm(`Are you sure to delete this course ${courseId}`)) {
        this.store.dispatch(deleteCourse({ courseId: courseId }));
      }
    }
  }

  onCreateCourse() {
    this.router.navigateByUrl('/coursesv2?edit=false');
    this.store.dispatch(setCreateCourseFormVisiable({ status: true }));
  }

  onViewCourse(selectedCourse: ICourseV2) {
    this.router.navigate(['coursesv2', 'course', selectedCourse.id]);
  }

}
