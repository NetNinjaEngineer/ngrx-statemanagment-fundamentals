import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { authLogin, loginStart, loginSuccess, logout, registerStart, registerSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Store } from "@ngrx/store";
import { SharedState } from "../../shared/store/shared.state";
import { setErrorMessage, setLoadingSpinner } from "../../shared/store/shared.actions";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

    actions$ = inject(Actions);
    authService = inject(AuthService);
    router = inject(Router);

    constructor(private readonly store: Store<{ shared: SharedState }>) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map(data => {
                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return loginSuccess({ user });
                    }),
                    catchError((errorResponse) => {
                        console.log(errorResponse);

                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        const errorMessage = this.authService.getErrorMessage(errorResponse.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })
        )
    });

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerStart),
            exhaustMap((action) => {
                return this.authService.register(action.email, action.password).pipe(
                    map(data => {
                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return registerSuccess({ user });
                    }),
                    catchError((errResponse) => {
                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        const errorMessage = this.authService.getErrorMessage(errResponse.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }))
                    })
                )
            })
        )
    });


    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            tap((action) => {
                this.store.dispatch(setErrorMessage({ message: '' }));
                this.router.navigate(['/home']);
            })
        )
    }, { dispatch: false })

    registerRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerSuccess),
            tap((action) => {
                this.store.dispatch(setErrorMessage({ message: '' }));
                this.router.navigate(['/home']);
            })
        )
    }, { dispatch: false });

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(authLogin),
            map((action) => {
                const user = this.authService.getUserFromLocalStorage();
                console.log(user);
                
                if (user && user.Token) {
                    return loginSuccess({ user });
                } else {
                    return logout();
                }
            })
        )
    });

}