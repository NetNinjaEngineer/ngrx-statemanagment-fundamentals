import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesState } from './store/courses.state';
import { Observable } from 'rxjs';
import { ICourse } from './models/course.model';
import { selectCourses, selectFilteredCourses, selectSeachQuery, selectSearchedCourses } from './store/courses.selectors';
import { filterCourses, loadCourses, searchCourses } from './store/courses.actions';
import { ICourseFilter } from './models/courseFilter';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses$: Observable<ICourse[]> | null = null;
  searchedCourses$: Observable<ICourse[]> | null = null;
  searchTerm$: Observable<string> | null = null;

  constructor(private readonly store: Store<{ courses: CoursesState }>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());

    this.courses$ = this.store.select(selectFilteredCourses);
    this.searchedCourses$ = this.store.select(selectSearchedCourses);
    this.searchTerm$ = this.store.select(selectSeachQuery);
  }

  coursesFilterChanged(filter: ICourseFilter) {
    console.log(filter);
    this.store.dispatch(filterCourses({ filter }));

  }

  searchCourses(searchTerm: string) {
    this.store.dispatch(searchCourses({ searchTerm }));
  }



}
