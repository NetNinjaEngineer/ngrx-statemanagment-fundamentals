import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../validators/customValidators';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.state';
import { registerStart } from '../../store/auth.actions';
import { setLoadingSpinner } from '../../../shared/store/shared.actions';
import { SharedState } from '../../../shared/store/shared.state';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: false
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: Store<{ auth: AuthState, shared: SharedState}>
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: [passwordMatchValidator] });

  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.store.dispatch(setLoadingSpinner({isLoading: true}));
      this.store.dispatch(registerStart({ email, password }));
    }
  }

}
