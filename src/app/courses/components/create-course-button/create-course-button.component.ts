import { Component, output } from '@angular/core';

@Component({
    selector: 'app-create-course-button',
    templateUrl: './create-course-button.component.html',
    styleUrl: './create-course-button.component.css',
    standalone: false
})
export class CreateCourseButtonComponent {

  readonly createCourseClicked = output<void>();

  onCreateCourse() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.createCourseClicked.emit();
  }

}
