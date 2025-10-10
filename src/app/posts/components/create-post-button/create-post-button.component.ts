import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-create-post-button',
    templateUrl: './create-post-button.component.html',
    styleUrl: './create-post-button.component.css',
    standalone: false
})
export class CreatePostButtonComponent {

  @Output() createPostBtnClicked = new EventEmitter<void>();

  onCreatePost() {
    this.createPostBtnClicked.emit();
  }

}
