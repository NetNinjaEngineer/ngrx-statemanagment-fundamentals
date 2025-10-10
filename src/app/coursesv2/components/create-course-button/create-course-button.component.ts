import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-create-course-button',
    templateUrl: './create-course-button.component.html',
    styleUrl: './create-course-button.component.css',
    standalone: false
})
export class CreateCourseButtonComponent {

  @Output() createCourseClicked = new EventEmitter<void>();

  onCreateCourse() {
    this.createCourseClicked.emit();
  }

}
