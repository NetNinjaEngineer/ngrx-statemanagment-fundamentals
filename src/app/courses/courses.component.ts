import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesState } from './store/courses.state';
import { Observable } from 'rxjs';
import { ICourse } from './models/course.model';
import { selectCourses, selectFilteredCourses } from './store/courses.selectors';
import { filterCourses, loadCourses } from './store/courses.actions';
import { ICourseFilter } from './models/courseFilter';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses$: Observable<ICourse[]> | null = null;
  filteredCourses$: Observable<ICourse[]> | null = null;

  constructor(private readonly store: Store<{ courses: CoursesState }>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.courses$ = this.store.select(selectFilteredCourses);
  }

  coursesFilterChanged(filter: ICourseFilter) {

    console.log(filter);


    this.store.dispatch(filterCourses({ filter }));



  }


}
