import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/store/auth.state';
import { isAuthenticated } from '../../auth/store/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<{ auth: AuthState }>);
  const token = localStorage.getItem('token');

  let isLoggedIn = false;

  store.select(isAuthenticated).subscribe(status => {
    isLoggedIn = status;
  });

  if (!isLoggedIn && !token) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
