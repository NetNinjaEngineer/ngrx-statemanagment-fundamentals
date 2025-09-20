import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedState } from './shared/store/shared.state';
import { Store } from '@ngrx/store';
import { getErrorMessage, getIsLoading } from './shared/store/shared.selectors';
import { AuthState } from './auth/store/auth.state';
import { authLogin } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  showLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  constructor(private readonly store: Store<{ shared: SharedState, auth: AuthState }>) {
    this.showLoading$ = this.store.select(getIsLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  ngOnInit(): void {
    this.store.dispatch(authLogin());
  }
}
