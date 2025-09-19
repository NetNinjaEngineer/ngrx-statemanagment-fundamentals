import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.state';
import { loginStart } from '../../store/auth.actions';
import { SharedState } from '../../../shared/store/shared.state';
import { setLoadingSpinner } from '../../../shared/store/shared.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private readonly fb: NonNullableFormBuilder,
        private readonly store: Store<{ auth: AuthState, shared: SharedState }>) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    onSubmit() {
        const { email, password } = this.loginForm.value;
        this.store.dispatch(setLoadingSpinner({ isLoading: true }));
        this.store.dispatch(loginStart({ email, password }));
    }

}
