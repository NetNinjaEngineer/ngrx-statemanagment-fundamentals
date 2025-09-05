import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesState } from './store/courses.state';
import { Observable } from 'rxjs';
import { ICourse } from './models/course.model';
import { selectCourses } from './store/courses.selectors';
import { loadCourses } from './store/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses$: Observable<ICourse[]> | null = null;
  constructor(private readonly store: Store<{ courses: CoursesState }>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.courses$ = this.store.select(selectCourses);
  }


}
