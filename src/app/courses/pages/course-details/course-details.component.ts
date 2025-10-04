import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoursesState } from '../../store/courses.state';
import { selectCourses } from '../../store/courses.selectors';
import { toSignal } from '@angular/core/rxjs-interop'
import { ICourse } from '../../models/course.model';
import { loadCourses } from '../../store/courses.actions';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _store = inject(Store<{ courses: CoursesState }>);

  private _courses = toSignal(this._store.select(selectCourses), { initialValue: [] as ICourse[] });

  courseId = signal<number | null>(null);

  selectedCourse = computed(() =>
    this.courseId() ? this._courses().find(c => c.id === this.courseId()) ?? null : null
  );

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.courseId.set(Number(params.get('id')));
      this._store.dispatch(loadCourses());
    });
  }

}
