import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CoursesState } from '../store/courses.state';
import { createCourse, setCreateCourseFormVisible } from '../store/courses.actions';

@Component({
  selector: 'app-create-course-modal',
  templateUrl: './create-course-modal.component.html',
  styleUrl: './create-course-modal.component.css'
})
export class CreateCourseModalComponent {
  courseForm: FormGroup;

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

  onSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      this.store.dispatch(createCourse({ course: this.courseForm.value }));
      this.store.dispatch(setCreateCourseFormVisible({ showCreateCourse: false }));
    }
  }

  close() {
    this.store.dispatch(setCreateCourseFormVisible({ showCreateCourse: false }));
  }

}
