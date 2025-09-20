import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/store/auth.state';
import { isAuthenticated } from '../../auth/store/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem('userData');
  const store = inject(Store<{ auth: AuthState }>);

  let loggedIn = false;

  store.select(isAuthenticated).subscribe((status) => {
    loggedIn = status;
  });

  if (!loggedIn) {
    router.navigate(['/auth/login']);
    return false;
  }


  if (!userData) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
