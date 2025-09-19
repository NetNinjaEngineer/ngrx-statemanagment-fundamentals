import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
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


    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            tap((action) => {
                console.log(action);
                
                this.router.navigate(['/home']);
            })
        )
    }, {dispatch: false}) 

}