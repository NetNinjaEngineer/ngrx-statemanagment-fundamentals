import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoursesV2State } from '../../store/coursesv2.state';
import { getCourseById } from '../../store/coursesv2.selectors';
import { Observable } from 'rxjs';
import { ICourseV2 } from '../../models/courseV2.model';

@Component({
  selector: 'app-course-details',
  standalone: false,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  selectedCourse$!: Observable<ICourseV2 | undefined>;

  constructor(private readonly store: Store<{ coursesv2: CoursesV2State }>) { }

  ngOnInit(): void {
    this.selectedCourse$ = this.store.select(getCourseById);
  }



}
