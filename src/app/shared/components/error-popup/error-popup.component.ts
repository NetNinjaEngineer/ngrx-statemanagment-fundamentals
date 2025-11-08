import { Component, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedState } from '../../store/shared.state';
import { setErrorMessage } from '../../store/shared.actions';

@Component({
    selector: 'app-error-popup',
    templateUrl: './error-popup.component.html',
    styleUrl: './error-popup.component.css',
    standalone: false
})
export class ErrorPopupComponent implements OnInit {
  readonly errorMessage = input.required<string | null>();

  constructor(private readonly store: Store<{ shared: SharedState }>) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(setErrorMessage({ message: '' }));
    }, 3000);
  }

}
