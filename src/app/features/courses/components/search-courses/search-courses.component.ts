import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrl: './search-courses.component.css'
})
export class SearchCoursesComponent {
  @Output()
  onSearchChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearch(searchElement: HTMLInputElement) {
    const searchValue = searchElement.value;
    console.log(`Searching for ${searchValue} in SearchCoursesComponent`);

    this.onSearchChanged.emit(searchValue);
  }

}
