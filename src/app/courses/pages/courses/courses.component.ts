import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectFilteredCourses, selectIsCreateCourseModalOpen, selectIsEditMode, selectSeachQuery, selectSearchedCourses } from '../../store/courses.selectors';
import { deleteCourse, filterCourses, loadCourses, searchCourses, setCreateCourseFormVisible, setEditMode, setSelectedCourse } from '../../store/courses.actions';
import { ICourse } from '../../models/course.model';
import { CoursesState } from '../../store/courses.state';
import { ICourseFilter } from '../../models/courseFilter';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit, OnDestroy {


  courses$: Observable<ICourse[]> | null = null;
  searchedCourses$: Observable<ICourse[]> | null = null;
  searchTerm$: Observable<string> | null = null;
  isCreateCourseFormVisible$: Observable<boolean> | undefined;
  isEditMode: boolean = false;
  editModeSubscription!: Subscription;

  constructor(private readonly store: Store<{ courses: CoursesState }>,
    private readonly coursesService: CoursesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this._activatedRoute.queryParamMap.subscribe(queryParams => {
      const searchQuery = queryParams.get('search');
      if (searchQuery !== null) {
        this.store.dispatch(searchCourses({ searchTerm: searchQuery }))
      }

    });

    this.store.dispatch(loadCourses());

    this.courses$ = this.store.select(selectFilteredCourses);
    this.searchedCourses$ = this.store.select(selectSearchedCourses);
    this.searchTerm$ = this.store.select(selectSeachQuery);
    this.isCreateCourseFormVisible$ = this.store.select(selectIsCreateCourseModalOpen);


    this.editModeSubscription = this.store.select(selectIsEditMode).subscribe(value => {
      this.isEditMode = value;
    });
  }

  coursesFilterChanged(filter: ICourseFilter) {
    console.log(filter);
    this.store.dispatch(filterCourses({ filter }));

  }

  searchCourses(searchTerm: string) {
    this.store.dispatch(searchCourses({ searchTerm }));
  }


  onCreateCourse() {
    this.store.dispatch(setCreateCourseFormVisible({ showCreateCourse: true }));
  }

  onEditCourse(selectedCourse: ICourse) {
    console.log("Editing course: ", selectedCourse);
    this.store.dispatch(setCreateCourseFormVisible({ showCreateCourse: true }));
    this.store.dispatch(setEditMode({ isEditMode: true }));

    this.store.dispatch(setSelectedCourse({ selectedCourse }));
  }

  onDeleteCourse(courseId: number) {
    console.log("Deleting course with ID: ", courseId);

    if (confirm("Are you sure you want to delete this course?")) {
      this.store.dispatch(deleteCourse({ courseId }));
    }



  }

  ngOnDestroy(): void {
    if (this.editModeSubscription) {
      console.log('Unsubscribing from editModeSubscription');
      this.editModeSubscription.unsubscribe();
    }
  }

  goToDetails(courseId: number) {
    this._router.navigateByUrl(`courses/${courseId}`);
  }




}
