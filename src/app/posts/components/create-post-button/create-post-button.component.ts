import { Component, output } from '@angular/core';

@Component({
    selector: 'app-create-post-button',
    templateUrl: './create-post-button.component.html',
    styleUrl: './create-post-button.component.css',
    standalone: false
})
export class CreatePostButtonComponent {

  readonly createPostBtnClicked = output<void>();

  onCreatePost() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.createPostBtnClicked.emit();
  }

}
