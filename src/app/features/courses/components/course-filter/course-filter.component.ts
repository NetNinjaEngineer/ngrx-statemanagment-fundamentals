import { Component, EventEmitter, Output } from '@angular/core';
import { ICourseFilter } from '../../models/courseFilter';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrl: './course-filter.component.css'
})
export class CourseFilterComponent {
  selectedCategory: string = '';
  selectedInstructor: string = '';
  maxPrice: number | null = null;
  minRating: number | null = null;

  categories: string[] = ["Frontend", "Backend", "Web Development"];
  instructors: string[] = ["Jane Smith", "John Doe", "Mike Johnson"];

  @Output()
  coursesFilterChanged: EventEmitter<ICourseFilter> = new EventEmitter<ICourseFilter>();

  applyFilters() {
    this.coursesFilterChanged.emit({
      category: this.selectedCategory,
      instructor: this.selectedInstructor,
      maxPrice: this.maxPrice,
      minRating: this.minRating
    })
  }

  resetFilters() {
    this.selectedCategory = '';
    this.selectedInstructor = '';
    this.maxPrice = null;
    this.minRating = null;

    this.applyFilters()
  }
}
