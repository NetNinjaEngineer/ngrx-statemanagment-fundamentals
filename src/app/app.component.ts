import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedState } from './shared/store/shared.state';
import { Store } from '@ngrx/store';
import { getErrorMessage, getIsLoading } from './shared/store/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  constructor(private readonly store: Store<{ shared: SharedState }>) { }

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getIsLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }
}
