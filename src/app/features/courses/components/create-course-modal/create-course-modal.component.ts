import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CoursesState } from '../../store/courses.state';
import { createCourse, setCreateCourseFormVisible, updateCourse } from '../../store/courses.actions';
import { ICourse } from '../../models/course.model';
import { getSelectedCourse } from '../../store/courses.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-course-modal',
  templateUrl: './create-course-modal.component.html',
  styleUrl: './create-course-modal.component.css'
})
export class CreateCourseModalComponent implements OnInit, OnDestroy {

  courseForm: FormGroup;
  @Input({ required: true }) isEditMode: boolean = false;
  selectedCourse: ICourse | null = null;

  selectedCourseSubscription!: Subscription;

  constructor(private fb: FormBuilder, private readonly store: Store<{ courses: CoursesState }>) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      author: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      instructor: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      isActive: [true],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectedCourseSubscription = this.store.select(getSelectedCourse).subscribe(course => {
      this.selectedCourse = course;
      if (this.isEditMode && this.selectedCourse) {
        this.courseForm.patchValue(this.selectedCourse);
      } else {
        this.courseForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {

      if (this.isEditMode) {
        const updatedCourse: ICourse = { ...this.selectedCourse, ...this.courseForm.value } as ICourse;
        this.store.dispatch(updateCourse({ course: updatedCourse }));
        this.store.dispatch(setCreateCourseFormVisible({ showCreateCourse: false }));

      }
      else {
        console.log(this.courseForm.value);
        this.store.dispatch(createCourse({ course: this.courseForm.value }));
        this.store.dispatch(setCreateCourseFormVisible({ showCreateCourse: false }));
      }
    }
  }

  close() {
    this.store.dispatch(setCreateCourseFormVisible({ showCreateCourse: false }));
  }

  ngOnDestroy(): void {
    if (this.selectedCourseSubscription) {
      this.selectedCourseSubscription.unsubscribe();
    }
  }

}
