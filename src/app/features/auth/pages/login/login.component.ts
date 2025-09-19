import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ILoginResponse } from '../../models/loginResponse';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private readonly fb: NonNullableFormBuilder,
        private readonly authService: AuthService) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;

            this.authService.login(email, password).subscribe((response: ILoginResponse) => {
                console.log('Login successful', response);            });

        } else {
            console.log('Form is invalid');
        }
    }

}
