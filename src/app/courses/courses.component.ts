import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  title: string = 'Courses';
  ngOnInit(): void {
    console.log('CoursesComponent initialized');
  }
}
