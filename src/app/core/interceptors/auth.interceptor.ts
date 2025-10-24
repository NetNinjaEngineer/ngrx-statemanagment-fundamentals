import { AuthState } from './../../auth/store/auth.state';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccessToken } from '../../auth/store/auth.selectors';
import { exhaustMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const store = inject(Store<{ auth: AuthState }>);

    return store.select(getAccessToken).pipe(
        exhaustMap((token) => {
            if (!token) {
                return next(req);
            }

            let modifiedReq = req.clone({ params: req.params.append('auth', token) });
            return next(modifiedReq);
        })
    );
};
