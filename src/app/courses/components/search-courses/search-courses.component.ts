import { Component, output } from '@angular/core';

@Component({
    selector: 'app-search-courses',
    templateUrl: './search-courses.component.html',
    styleUrl: './search-courses.component.css',
    standalone: false
})
export class SearchCoursesComponent {
  readonly onSearchChanged = output<string>();

  onSearch(searchElement: HTMLInputElement) {
    const searchValue = searchElement.value;
    console.log(`Searching for ${searchValue} in SearchCoursesComponent`);

    this.onSearchChanged.emit(searchValue);
  }

}
